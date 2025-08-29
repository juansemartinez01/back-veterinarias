import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenPaciente } from './imagen-paciente.entity';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { PacientesModule } from '../pacientes/pacientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImagenPaciente]),
    PacientesModule,
  ],
  providers: [ImagenesService],
  controllers: [ImagenesController],
})
export class ImagenesModule {}
