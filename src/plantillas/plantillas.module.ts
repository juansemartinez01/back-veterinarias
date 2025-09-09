// src/plantillas/plantillas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantillaMensaje } from './plantilla-mensaje.entity';
import { PlantillasService } from './plantillas.service';
import { PlantillasController } from './plantillas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlantillaMensaje])],
  providers: [PlantillasService],
  controllers: [PlantillasController],
  exports: [PlantillasService],
})
export class PlantillasModule {}
