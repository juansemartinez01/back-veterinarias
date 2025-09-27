// src/integraciones/organ-draft.module.ts
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { OrganDraftController } from "./organ-draft.controller";
import { OrganDraftService } from "./organ-draft.service";

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
  ],
  controllers: [OrganDraftController],
  providers: [OrganDraftService],
  exports: [OrganDraftService],
})
export class OrganDraftModule {}
