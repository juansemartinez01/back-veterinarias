// src/imagenes/imagenes.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  Param,
  UseInterceptors,
  UseGuards,
  Get,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { ImagenesService } from "./imagenes.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { TenantGuard } from "../shared/guards/tenant.guard";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { PacientesService } from "../pacientes/pacientes.service";
import * as Express from "express";

// Multer config
const storage = diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname || "");
    cb(null, `${unique}${ext}`);
  },
});
const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  const ok = /^image\/(jpeg|png|webp|gif|bmp|tiff)$/i.test(file.mimetype || "");
  if (!ok)
    return cb(new BadRequestException("Tipo de archivo no permitido"), false);
  cb(null, true);
};

@Controller("imagenes")
@UseGuards(JwtAuthGuard, TenantGuard)
export class ImagenesController {
  constructor(
    private readonly service: ImagenesService,
    private readonly pacientesService: PacientesService
  ) {}

  @Post("paciente/:id")
  @UseInterceptors(
    FileInterceptor("file", {
      storage,
      fileFilter,
      limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
    })
  )
  async subirImagen(
    @Param("id") pacienteId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any
  ) {
    if (!file) throw new BadRequestException('Falta archivo "file"');
    const paciente = await this.pacientesService.obtenerPorId(
      pacienteId,
      user.veterinariaId
    );
    const out = await this.service.guardarImagen(
      {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
      paciente,
      user.veterinariaId,
      user.id
    );
    return out; // { imagen, mediaId }
  }

  @Get("paciente/:id")
  async obtenerPorPaciente(
    @Param("id") pacienteId: string,
    @CurrentUser() user: any
  ) {
    const paciente = await this.pacientesService.obtenerPorId(
      pacienteId,
      user.veterinariaId
    );
    return this.service.obtenerPorPaciente(paciente, user.veterinariaId);
  }

  @Delete(":id")
  async eliminar(@Param("id") id: string, @CurrentUser() user: any) {
    return this.service.eliminar(id, user.veterinariaId);
  }
}
