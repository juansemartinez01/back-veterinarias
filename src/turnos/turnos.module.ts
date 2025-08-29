import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  providers: [TurnosService],
  controllers: [TurnosController],
})
export class TurnosModule {}
