import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consulta } from './consulta.entity';
import { Repository } from 'typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private repo: Repository<Consulta>,
  ) {}

  async crear(dto: CreateConsultaDto, veterinario: Usuario): Promise<Consulta> {
    const consulta = this.repo.create({
      motivo: dto.motivo,
      diagnostico: dto.diagnostico,
      tratamiento: dto.tratamiento,
      paciente: { id: dto.pacienteId },
      veterinario,
      veterinaria: veterinario.veterinaria,
    });

    return this.repo.save(consulta);
  }

  async listarPorPaciente(pacienteId: string, veterinariaId: string): Promise<Consulta[]> {
    return this.repo.find({
      where: {
        paciente: { id: pacienteId },
        veterinaria: { id: veterinariaId },
      },
      order: { fecha: 'DESC' },
    });
  }
}
