import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { OrganDraftController } from "./organ-draft.controller";
import { OrganDraftService } from "./organ-draft.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: Number(process.env.ORGAN_TIMEOUT_MS || 15000),
        maxRedirects: 0,
        // proxy, httpsAgent, etc. si hiciera falta
      }),
    }),
  ],
  controllers: [OrganDraftController],
  providers: [OrganDraftService],
  exports: [OrganDraftService],
})
export class OrganDraftModule {}
