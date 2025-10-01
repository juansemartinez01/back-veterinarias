import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SttService } from "./stt.service";
import { SttSessionStore } from "./stt-session.store";
import { SttController } from "./stt.controller";
import { SttStreamController } from "./stt-stream.controller";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: (process.env.STT_API_BASE || "").replace(/\/+$/, ""),
        timeout: Number(process.env.STT_TIMEOUT_MS || 60000),
      }),
    }),
  ],
  controllers: [SttController, SttStreamController],
  providers: [SttService, SttSessionStore],
  exports: [SttService],
})
export class SttModule {}
