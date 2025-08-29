import { Controller, Post, UploadedFile, Param, UseInterceptors, UseGuards, Get } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { PacientesService } from '../pacientes/pacientes.service';
import * as Express from 'express';

@Controller('imagenes')
@UseGuards(JwtAuthGuard, TenantGuard)
export class ImagenesController {
  constructor(
    private readonly service: ImagenesService,
    private readonly pacientesService: PacientesService,
  ) {}

  @Post('paciente/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${unique}${ext}`);
      },
    }),
  }))
  async subirImagen(
    @Param('id') pacienteId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user,
  ) {
    const paciente = await this.pacientesService.obtenerPorId(pacienteId, user.veterinariaId);
    return this.service.guardarImagen(file.filename, paciente, user.veterinariaId);
  }

  @Get('paciente/:id')
  async obtenerPorPaciente(@Param('id') pacienteId: string, @CurrentUser() user) {
    const paciente = await this.pacientesService.obtenerPorId(pacienteId, user.veterinariaId);
    return this.service.obtenerPorPaciente(paciente, user.veterinariaId);
  }
}
