import { Injectable, BadGatewayException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import * as FormData from "form-data";
import type { AxiosError } from "axios";

export type UsageTokens = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
export type STTOut = { text: string; usage?: UsageTokens };

// Config: en tu HttpModule cargá baseURL = process.env.STT_API_BASE
// Acá usamos un path relativo, p.ej. "/speech-to-text"
@Injectable()
export class SttService {
  private readonly tmo = Number(process.env.STT_TIMEOUT_MS || 60000);
  private readonly sttPath = process.env.STT_API_PATH || "/speech-to-text";
  private readonly apiKey = process.env.STT_API_KEY || "";

  constructor(private readonly http: HttpService) {}

  async transcribirBuffer(
    buffer: Buffer,
    filename: string,
    language: string
  ): Promise<STTOut> {
    const fd = new FormData();
    fd.append("file", buffer, {
      filename,
      contentType: "application/octet-stream",
    });

    try {
      const { data } = await this.http.axiosRef.post<STTOut>(this.sttPath, fd, {
        params: { language },
        headers: {
          ...fd.getHeaders(),
          Authorization: this.apiKey ? `Bearer ${this.apiKey}` : undefined,
        },
        timeout: this.tmo,
      });
      return data;
    } catch (e) {
      const err = e as AxiosError<any>;
      throw new BadGatewayException({
        message: "STT externo falló",
        status: err.response?.status,
        detail: err.response?.data ?? err.message,
      });
    }
  }
}
