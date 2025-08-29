import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { Repository } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turno)
    private repo: Repository<Turno>,
  ) {}

  async crear(dto: CreateTurnoDto, veterinaria: Veterinaria): Promise<Turno> {
    const turno = this.repo.create({
      fechaHora: dto.fechaHora,
      cliente: { id: dto.clienteId },
      paciente: { id: dto.pacienteId },
      veterinario: { id: dto.veterinarioId },
      veterinaria,
      estado: 'pendiente',
    });

    return this.repo.save(turno);
  }

  async listarPorVeterinaria(veterinariaId: string): Promise<Turno[]> {
    return this.repo.find({
      where: { veterinaria: { id: veterinariaId } },
      order: { fechaHora: 'ASC' },
    });
  }

  async actualizarEstado(id: string, estado: 'pendiente' | 'atendido' | 'cancelado'): Promise<Turno> {
    const turno = await this.repo.findOneBy({ id });
    if (turno) {
      turno.estado = estado;
      return this.repo.save(turno);
    }
  }
}
