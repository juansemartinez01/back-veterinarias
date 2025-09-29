// src/integraciones/organ-draft.module.ts
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { OrganDraftController } from "./organ-draft.controller";
import { OrganDraftService } from "./organ-draft.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Paciente } from "src/pacientes/paciente.entity";
import { Estudio } from "src/estudios/estudio.entity";
import { Informe } from "src/informes/informe.entity";
import { ClinicalResumeBuilderService } from "./clinical-resume-builder.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => {
        const base = (process.env.ORGAN_API_BASE || "").replace(/\/+$/, "");
        if (!base) {
          throw new Error(
            "Falta ORGAN_API_BASE en el .env (ej: https://externo.com/api/v1)"
          );
        }
        return {
          baseURL: base, // ⬅️ ¡clave! Todo lo demás será relativo a esto
          timeout: Number(process.env.ORGAN_TIMEOUT_MS || 30000),
          maxRedirects: 0,
        };
      },
    }),
    TypeOrmModule.forFeature([Paciente, Estudio, Informe]),
  ],
  controllers: [OrganDraftController],
  providers: [OrganDraftService, ClinicalResumeBuilderService],
  exports: [OrganDraftService],
})
export class OrganDraftModule {}
