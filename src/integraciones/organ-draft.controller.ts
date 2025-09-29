import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { TenantGuard } from "../shared/guards/tenant.guard";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { OrganDraftInputDto, OrganDraftOutputDto } from "./dto/organ-draft.dto";
import { OrganDraftService } from "./organ-draft.service";
import { DraftConclusionInputDto, DraftConclusionOutputDto } from "./dto/draft-report-conclusion.dto";
import { ClinicalResumeInputDto, ClinicalResumeOutputDto } from "./dto/clinical-resume.dto";
import { ClinicalResumeBuilderService } from "./clinical-resume-builder.service";

@Controller("integraciones")
@UseGuards(JwtAuthGuard, TenantGuard)
export class OrganDraftController {
  constructor(
    private readonly service: OrganDraftService,
    private readonly builder: ClinicalResumeBuilderService
  ) {}

  /**
   * Reenvía el payload al sistema externo y devuelve su respuesta
   */
  @Post("organ-draft")
  generar(
    @Body() dto: OrganDraftInputDto,
    @CurrentUser() user: any
  ): Promise<OrganDraftOutputDto> {
    return this.service.generar(dto, {
      veterinariaId: user.veterinariaId,
      userId: user.id,
    });
  }

  @Post("draft-report-conclusion")
  generarConclusion(
    @Body() dto: DraftConclusionInputDto,
    @CurrentUser() user: any
  ): Promise<DraftConclusionOutputDto> {
    return this.service.generarConclusion(dto, {
      veterinariaId: user.veterinariaId,
      userId: user.id,
    });
  }

  @Post("clinical-resume")
  generarClinicalResume(
    @Body() dto: ClinicalResumeInputDto,
    @CurrentUser() user: any
  ): Promise<ClinicalResumeOutputDto> {
    return this.service.generarClinicalResume(dto, {
      veterinariaId: user.veterinariaId,
      userId: user.id,
    });
  }

  @Get("clinical-resume/payload/:pacienteId")
  buildClinicalResumePayload(
    @Param("pacienteId") pacienteId: string,
    @Query("lang") lang: "es" | "en" = "es",
    @CurrentUser() user: any
  ): Promise<ClinicalResumeInputDto> {
    return this.builder.buildPayloadFromPaciente(
      user.veterinariaId,
      pacienteId,
      lang
    );
  }

  @Post("clinical-resume/from-paciente/:pacienteId")
  async generarClinicalResumeDesdePaciente(
    @Param("pacienteId") pacienteId: string,
    @Query("lang") lang: "es" | "en" = "es",
    @CurrentUser() user: any
  ): Promise<ClinicalResumeOutputDto> {
    const payload = await this.builder.buildPayloadFromPaciente(
      user.veterinariaId,
      pacienteId,
      lang
    );
    return this.service.generarClinicalResume(payload, {
      veterinariaId: user.veterinariaId,
      userId: user.id,
    });
  }
}
