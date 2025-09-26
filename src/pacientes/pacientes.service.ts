import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paciente } from "./paciente.entity";
import { CreatePacienteDto } from "./dto/create-paciente.dto";
import { Cliente } from "../clientes/cliente.entity";
import { Veterinaria } from "../veterinarias/veterinaria.entity";
import { Especie } from "../especies/especie.entity";
import { Raza } from "../razas/raza.entity";

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente) private readonly repo: Repository<Paciente>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    @InjectRepository(Especie)
    private readonly especieRepo: Repository<Especie>,
    @InjectRepository(Raza) private readonly razaRepo: Repository<Raza>
  ) {}

  async crear(
    dto: CreatePacienteDto,
    veterinaria: Veterinaria
  ): Promise<Paciente> {
    const cliente = await this.clienteRepo.findOne({
      where: { id: dto.clienteId },
    });
    if (!cliente) throw new NotFoundException("Cliente no encontrado");

    const especie = await this.especieRepo.findOne({
      where: { id: dto.especieId },
    });
    if (!especie) throw new NotFoundException("Especie no encontrada");

    let raza: Raza | undefined;
    if (dto.razaId) {
      raza = await this.razaRepo.findOne({ where: { id: dto.razaId } });
      if (!raza) throw new NotFoundException("Raza no encontrada");
      if (raza.especie.id !== especie.id) {
        throw new BadRequestException(
          "La raza no pertenece a la especie indicada"
        );
      }
    }

    const fechaNacimiento = dto.fechaNacimiento
      ? new Date(dto.fechaNacimiento)
      : undefined;
    if (fechaNacimiento && isNaN(+fechaNacimiento)) {
      throw new BadRequestException("fechaNacimiento inválida");
    }

    const paciente = this.repo.create({
      nombre: dto.nombre,
      especie,
      raza: raza ?? null,
      fechaNacimiento,
      sexo: dto.sexo ?? "desconocido",
      pesoKg: dto.pesoKg ?? null,
      castrado: dto.castrado ?? false,
      // snapshot del dueño (si no lo envían, lo tomamos del Cliente)
      duenoNombre: dto.duenoNombre ?? cliente?.nombre ?? null,
      duenoTelefono: dto.duenoTelefono ?? (cliente as any)?.telefono ?? null,
      duenoEmail: dto.duenoEmail ?? (cliente as any)?.email ?? null,
      duenoDireccion: dto.duenoDireccion ?? (cliente as any)?.direccion ?? null,
      cliente: { id: dto.clienteId } as Cliente,
      veterinaria,
    });

    return this.repo.save(paciente);
  }

  async listarPorVeterinaria(veterinariaId: string): Promise<Paciente[]> {
    return this.repo.find({
      where: { veterinaria: { id: veterinariaId } },
      relations: ["cliente", "especie", "raza"],
      order: { nombre: "ASC" },
    });
  }

  async obtenerPorId(id: string, veterinariaId: string): Promise<Paciente> {
    const paciente = await this.repo.findOne({
      where: { id, veterinaria: { id: veterinariaId } },
      relations: ["cliente", "imagenes", "especie", "raza"],
    });

    if (!paciente) throw new NotFoundException("Paciente no encontrado");
    return paciente;
  }
}
