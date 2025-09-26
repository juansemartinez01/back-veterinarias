import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RazasService } from "./razas.service";
import { RazasController } from "./razas.controller";
import { Raza } from "./raza.entity";
import { Especie } from "../especies/especie.entity";
import { Paciente } from "../pacientes/paciente.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Raza, Especie, Paciente])],
  controllers: [RazasController],
  providers: [RazasService],
  exports: [RazasService],
})
export class RazasModule {}
