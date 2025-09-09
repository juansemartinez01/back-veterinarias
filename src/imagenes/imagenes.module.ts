// src/imagenes/imagenes.module.ts (crear o modificar)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenPaciente } from './imagen-paciente.entity';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { MediaModule } from '../media/media.module'; // <--- NUEVO
import { PacientesModule } from '../pacientes/pacientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([ImagenPaciente]), MediaModule, PacientesModule],
  providers: [ImagenesService],
  controllers: [ImagenesController],
  exports: [ImagenesService],
})
export class ImagenesModule {}
