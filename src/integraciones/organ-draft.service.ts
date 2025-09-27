import { BadGatewayException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timeout } from 'rxjs';
import type { AxiosError } from "axios";
import { OrganDraftInputDto, OrganDraftOutputDto } from './dto/organ-draft.dto';
import { DraftConclusionInputDto, DraftConclusionOutputDto } from './dto/draft-report-conclusion.dto';

@Injectable()
export class OrganDraftService {
  private readonly url = process.env.ORGAN_API_URL!;
  private readonly apiKey = process.env.ORGAN_API_KEY || "";
  private readonly tmo = Number(process.env.ORGAN_TIMEOUT_MS || 15000);

  // URLs: podés setear directos o un BASE y se arman solos
  private readonly base = (process.env.ORGAN_API_BASE || "").replace(/\/$/, "");
  private readonly urlOrganDraft =
    process.env.ORGAN_API_URL ||
    (this.base ? `${this.base}/organ-draft-report` : "");
  private readonly urlConclusion =
    process.env.ORGAN_API_URL_CONCLUSION ||
    (this.base ? `${this.base}/draft-report-conclusion` : "");

  constructor(private readonly http: HttpService) {
    if (!this.url) {
      throw new InternalServerErrorException("ORGAN_API_URL no configurada");
    }
  }

  async generar(
    dto: OrganDraftInputDto,
    contexto: { veterinariaId: string; userId: string }
  ): Promise<OrganDraftOutputDto> {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (this.apiKey) headers["Authorization"] = `Bearer ${this.apiKey}`;

      // ❯❯ Usamos axiosRef (sin RxJS) para evitar problemas de tipado
      const { data } = await this.http.axiosRef.post<OrganDraftOutputDto>(
        this.urlOrganDraft,
        dto,
        {
          headers,
          timeout: this.tmo,
          // validateStatus: () => true, // si querés NO tirar error en 4xx/5xx
        }
      );

      return data; // { consult_id, inform, usage? }
    } catch (e) {
      const err = e as AxiosError<any>;
      const status = err.response?.status;
      const detail =
        err.response?.data ??
        err.message ??
        "Error llamando al servicio externo";
      throw new BadGatewayException({
        message: "Organ draft externo falló",
        status,
        detail,
      });
    }
  }

  async generarConclusion(
    dto: DraftConclusionInputDto,
    contexto: { veterinariaId: string; userId: string }
  ): Promise<DraftConclusionOutputDto> {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (this.apiKey) headers["Authorization"] = `Bearer ${this.apiKey}`;

      const { data } = await this.http.axiosRef.post<DraftConclusionOutputDto>(
        this.urlConclusion,
        dto,
        {
          headers,
          timeout: this.tmo,
        }
      );
      return data; // { conclusion, gravedad, diagnosticos[], usage? }
    } catch (e) {
      const err = e as AxiosError<any>;
      const status = err.response?.status;
      const detail =
        err.response?.data ??
        err.message ??
        "Error llamando al servicio externo (draft-report-conclusion)";
      throw new BadGatewayException({
        message: "Draft report conclusion externo falló",
        status,
        detail,
      });
    }
  }
}
