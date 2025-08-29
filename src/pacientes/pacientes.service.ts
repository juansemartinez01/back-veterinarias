import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { Cliente } from '../clientes/cliente.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly repo: Repository<Paciente>,
  ) {}

  async crear(dto: CreatePacienteDto, veterinaria: Veterinaria): Promise<Paciente> {
    const paciente = this.repo.create({
      nombre: dto.nombre,
      especie: dto.especie,
      raza: dto.raza,
      fechaNacimiento: dto.fechaNacimiento,
      cliente: { id: dto.clienteId } as Cliente,
      veterinaria,
    });

    return this.repo.save(paciente);
  }

  async listarPorVeterinaria(veterinariaId: string): Promise<Paciente[]> {
    return this.repo.find({
      where: { veterinaria: { id: veterinariaId } },
      relations: ['cliente'],
      order: { nombre: 'ASC' },
    });
  }

  async obtenerPorId(id: string, veterinariaId: string): Promise<Paciente> {
    const paciente = await this.repo.findOne({
      where: { id, veterinaria: { id: veterinariaId } },
      relations: ['cliente', 'imagenes'],
    });

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return paciente;
  }
}
