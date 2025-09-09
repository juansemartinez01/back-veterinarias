import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';
import { TurnosEstadoModule } from '../turnos-estado/turnos-estado.module';
import { NotificacionesModule } from 'src/notificaciones/notificaciones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Turno]),NotificacionesModule,TurnosEstadoModule],
  providers: [TurnosService],
  controllers: [TurnosController],
})
export class TurnosModule {}
