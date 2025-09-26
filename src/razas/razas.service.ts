import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Raza } from "./raza.entity";
import { CreateRazaDto } from "./dto/create-raza.dto";
import { Especie } from "../especies/especie.entity";
import { Paciente } from "../pacientes/paciente.entity";

const NOMBRE_DEFAULT = "NO DEFINIDO";

@Injectable()
export class RazasService {
  constructor(
    private readonly ds: DataSource,
    @InjectRepository(Raza) private readonly razaRepo: Repository<Raza>,
    @InjectRepository(Especie)
    private readonly especieRepo: Repository<Especie>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>
  ) {}

  async listar(especieId?: string): Promise<Raza[]> {
    if (especieId) {
      return this.razaRepo.find({
        where: { especie: { id: especieId } },
        order: { nombre: "ASC" },
      });
    }
    return this.razaRepo.find({ order: { nombre: "ASC" } });
  }

  async crear(dto: CreateRazaDto): Promise<Raza> {
    const especie = await this.especieRepo.findOne({
      where: { id: dto.especieId },
    });
    if (!especie) throw new NotFoundException("Especie no encontrada");

    const dup = await this.razaRepo.findOne({
      where: { nombre: dto.nombre, especie: { id: especie.id } },
    });
    if (dup)
      throw new BadRequestException(
        "Ya existe una raza con ese nombre en la especie dada"
      );

    const entity = this.razaRepo.create({ nombre: dto.nombre, especie });
    return this.razaRepo.save(entity);
  }

  async eliminar(razaId: string): Promise<{ ok: true }> {
    return this.ds.transaction(async (qr) => {
      const razaRepo = qr.getRepository(Raza);
      const especieRepo = qr.getRepository(Especie);

      const raza = await razaRepo.findOne({
        where: { id: razaId },
        relations: ["especie"],
      });
      if (!raza) throw new NotFoundException("Raza no encontrada");

      if (raza.nombre.trim().toUpperCase() === NOMBRE_DEFAULT) {
        throw new BadRequestException(
          "No se puede eliminar la raza por defecto"
        );
      }

      // Buscar raza "NO DEFINIDO" (global, bajo la especie por defecto)
      const especieDefault = await especieRepo.findOne({
        where: { nombre: NOMBRE_DEFAULT },
      });
      if (!especieDefault)
        throw new NotFoundException('Especie "NO DEFINIDO" no encontrada');

      const razaDefault = await razaRepo.findOne({
        where: { nombre: NOMBRE_DEFAULT, especie: { id: especieDefault.id } },
        relations: ["especie"],
      });
      if (!razaDefault) {
        throw new NotFoundException(
          'Raza "NO DEFINIDO" no encontrada (debe existir en la especie por defecto)'
        );
      }

      // 1) Reasignar todos los pacientes que usen esta raza a la raza "NO DEFINIDO"
      await qr.query('UPDATE paciente SET "razaId" = $1 WHERE "razaId" = $2', [
        razaDefault.id,
        razaId,
      ]);

      // 2) Eliminar la raza
      await razaRepo.delete(razaId);

      return { ok: true as const };
    });
  }
}
