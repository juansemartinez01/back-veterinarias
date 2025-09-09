// src/informes/informes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformesService } from './informes.service';
import { InformesController } from './informes.controller';
import { Informe } from './informe.entity';
import { InformeSeccion } from './informe-seccion.entity';
import { Medicion } from './medicion.entity';
import { Estudio } from '../estudios/estudio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Informe, InformeSeccion, Medicion, Estudio])],
  providers: [InformesService],
  controllers: [InformesController],
  exports: [InformesService],
})
export class InformesModule {}
