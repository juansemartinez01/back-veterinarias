import {
  Controller,
  Sse,
  MessageEvent,
  Param,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Delete,
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { TenantGuard } from "../shared/guards/tenant.guard";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SttService } from "./stt.service";
import { SttSessionStore } from "./stt-session.store";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { Express } from "express";

@Controller("integraciones/stt")
@UseGuards(JwtAuthGuard, TenantGuard)
export class SttStreamController {
  private readonly minDelayMs = Number(process.env.STT_MIN_DELAY_MS || 2000); // 2s por defecto
  private readonly filenamePartial = "stream-part.wav";
  private readonly filenameFinal = "stream-final.wav";

  constructor(
    private readonly stt: SttService,
    private readonly store: SttSessionStore
  ) {}

  /**
   * 1) El front abre esta conexión SSE para recibir parciales.
   *    Ej: const es = new EventSource(`${API}/integraciones/stt/sse/${sessionId}`);
   */
  @Sse("sse/:sessionId")
  stream(@Param("sessionId") sessionId: string): Observable<MessageEvent> {
    const session = this.store.ensure(sessionId);
    return session.stream$.pipe(map((evt) => ({ data: evt })));
  }

  /**
   * 2) El front envía chunks (2–3s) en form-data: "chunk"
   *    MediaRecorder → ondataavailable → POST /chunk/:sessionId
   */
  @Post("chunk/:sessionId")
  @UseInterceptors(
    FileInterceptor("chunk", {
      storage: multer.memoryStorage(),
      limits: { fileSize: 20 * 1024 * 1024 },
    })
  )
  async pushChunk(
    @Param("sessionId") sessionId: string,
    @UploadedFile() file: Express.Multer.File,
    @Query("language") language: "es" | "en" = "es"
  ) {
    const session = this.store.ensure(sessionId);
    if (!file?.buffer?.length) {
      return { ok: false, reason: "no_chunk" };
    }

    session.chunks.push(file.buffer);
    const now = Date.now();

    // Si ya pasó el delay mínimo y no estamos procesando, emitimos parcial
    if (!session.processing && now - session.lastEmit >= this.minDelayMs) {
      session.processing = true;
      try {
        const merged = Buffer.concat(session.chunks);
        // Llamada al STT externo
        const out = await this.stt.transcribirBuffer(
          merged,
          this.filenamePartial,
          language
        );
        session.lastEmit = Date.now();
        session.stream$.next({ type: "partial", text: out.text || "" });

        // Mantenemos contexto sin crecer infinito: dejamos sólo el último chunk
        if (session.chunks.length > 0) {
          session.chunks = [session.chunks[session.chunks.length - 1]];
        }
      } catch (e: any) {
        session.stream$.next({
          type: "error",
          text: e?.message || "STT error",
        });
      } finally {
        session.processing = false;
      }
    }

    return { ok: true };
  }

  /**
   * 3) El front corta la sesión → hacemos una transcripción final y cerramos
   *    Ej: DELETE /chunk/:sessionId
   */
  @Delete("chunk/:sessionId")
  async finalize(
    @Param("sessionId") sessionId: string,
    @Query("language") language: "es" | "en" = "es"
  ) {
    const session = this.store.get(sessionId);
    if (!session) return { ok: true };

    try {
      const merged = session.chunks.length
        ? Buffer.concat(session.chunks)
        : Buffer.alloc(0);
      const out = merged.length
        ? await this.stt.transcribirBuffer(merged, this.filenameFinal, language)
        : { text: "" };

      session.stream$.next({ type: "final", text: out.text || "" });
    } catch (e: any) {
      session.stream$.next({ type: "error", text: e?.message || "STT error" });
    } finally {
      this.store.close(sessionId);
    }
    return { ok: true };
  }
}
