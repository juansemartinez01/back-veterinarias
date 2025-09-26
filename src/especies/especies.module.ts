import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EspeciesService } from "./especies.service";
import { EspeciesController } from "./especies.controller";
import { Especie } from "./especie.entity";
import { Raza } from "../razas/raza.entity";
import { Paciente } from "../pacientes/paciente.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Especie, Raza, Paciente])],
  controllers: [EspeciesController],
  providers: [EspeciesService],
  exports: [EspeciesService],
})
export class EspeciesModule {}
