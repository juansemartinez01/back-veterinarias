// src/notificaciones/notificaciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionProgramada } from './notificacion-programada.entity';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesWorker } from './notificaciones.worker';
import { Turno } from '../turnos/turno.entity';
import { TenantSettingsModule } from '../tenant-settings/tenant-settings.module';
import { PlantillasModule } from '../plantillas/plantillas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificacionProgramada, Turno]),
    TenantSettingsModule,
    PlantillasModule,
  ],
  providers: [NotificacionesService, NotificacionesWorker],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
