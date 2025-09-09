// src/turnos-estado/turnos-estado.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from '../turnos/turno.entity';
import { TurnoHistorialEstado } from './turno-historial-estado.entity';
import { EstadoTurnoService } from './estado-turno.service';
import { TurnosEstadoController } from './turnos-estado.controller';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, TurnoHistorialEstado]), NotificacionesModule],
  providers: [EstadoTurnoService],
  controllers: [TurnosEstadoController],
  exports: [EstadoTurnoService],
})
export class TurnosEstadoModule {}
