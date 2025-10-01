import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { TenantGuard } from "../shared/guards/tenant.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { SttService } from "./stt.service";
import { Express } from "express";

@Controller("integraciones")
@UseGuards(JwtAuthGuard, TenantGuard)
export class SttController {
  constructor(private readonly stt: SttService) {}

  @Post("stt")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  )
  async transcribirArchivo(
    @UploadedFile() file: Express.Multer.File,
    @Query("language") language: "es" | "en" = "es"
  ) {
    const buf = file?.buffer;
    if (!buf?.length) return { text: "" };
    return this.stt.transcribirBuffer(
      buf,
      file.originalname || "audio.wav",
      language
    );
  }
}
