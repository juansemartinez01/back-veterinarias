import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Especie } from "./especie.entity";
import { CreateEspecieDto } from "./dto/create-especie.dto";
import { Raza } from "../razas/raza.entity";
import { Paciente } from "../pacientes/paciente.entity";

const NOMBRE_DEFAULT = "NO DEFINIDO";

@Injectable()
export class EspeciesService {
  constructor(
    private readonly ds: DataSource,
    @InjectRepository(Especie)
    private readonly especieRepo: Repository<Especie>,
    @InjectRepository(Raza) private readonly razaRepo: Repository<Raza>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>
  ) {}

  async listar(): Promise<Especie[]> {
    return this.especieRepo.find({ order: { nombre: "ASC" } });
  }

  async crear(dto: CreateEspecieDto): Promise<Especie> {
    const exists = await this.especieRepo.findOne({
      where: { nombre: dto.nombre },
    });
    if (exists)
      throw new BadRequestException("Ya existe una especie con ese nombre");
    const entity = this.especieRepo.create({ nombre: dto.nombre });
    return this.especieRepo.save(entity);
  }

  async eliminar(especieId: string): Promise<{ ok: true }> {
    return this.ds.transaction(async (qr) => {
      const especieRepo = qr.getRepository(Especie);
      const razaRepo = qr.getRepository(Raza);

      const especie = await especieRepo.findOne({ where: { id: especieId } });
      if (!especie) throw new NotFoundException("Especie no encontrada");

      if (especie.nombre.trim().toUpperCase() === NOMBRE_DEFAULT) {
        throw new BadRequestException(
          "No se puede eliminar la especie por defecto"
        );
      }

      const defaultEspecie = await especieRepo.findOne({
        where: { nombre: NOMBRE_DEFAULT },
      });
      if (!defaultEspecie)
        throw new NotFoundException('Especie "NO DEFINIDO" no encontrada');

      const defaultRaza = await razaRepo.findOne({
        where: { nombre: NOMBRE_DEFAULT, especie: { id: defaultEspecie.id } },
        relations: ["especie"],
      });
      if (!defaultRaza) {
        throw new NotFoundException(
          'Raza "NO DEFINIDO" no encontrada (debe existir en la especie por defecto)'
        );
      }

      // 1) Reasignar especie en todos los pacientes con esa especie
      await qr.query(
        'UPDATE paciente SET "especieId" = $1 WHERE "especieId" = $2',
        [defaultEspecie.id, especieId]
      );

      // 2) Reasignar raza a "NO DEFINIDO" en pacientes cuya raza pertenezca a la especie a eliminar
      await qr.query(
        'UPDATE paciente SET "razaId" = $1 WHERE "razaId" IN (SELECT id FROM raza WHERE "especieId" = $2)',
        [defaultRaza.id, especieId]
      );

      // 3) Eliminar todas las razas de la especie (ya sin referencias)
      await qr.query('DELETE FROM raza WHERE "especieId" = $1', [especieId]);

      // 4) Eliminar la especie
      await especieRepo.delete(especieId);

      return { ok: true as const };
    });
  }
}
