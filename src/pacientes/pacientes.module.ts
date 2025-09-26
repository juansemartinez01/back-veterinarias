import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { Cliente } from 'src/clientes/cliente.entity';
import { Especie } from 'src/especies/especie.entity';
import { Raza } from 'src/razas/raza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, Cliente, Especie, Raza])],
  providers: [PacientesService],
  controllers: [PacientesController],
  exports: [PacientesService],
})
export class PacientesModule {}
