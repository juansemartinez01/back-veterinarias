// src/estudios/estudios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudio } from './estudio.entity';
import { CreateEstudioDto } from './dto/create-estudio.dto';

@Injectable()
export class EstudiosService {
  constructor(@InjectRepository(Estudio) private repo: Repository<Estudio>) {}

  async crear(tenantId: string, dto: CreateEstudioDto) {
    const e = this.repo.create({
      veterinaria: { id: tenantId } as any,
      paciente: { id: dto.pacienteId } as any,
      consulta: dto.consultaId ? ({ id: dto.consultaId } as any) : null,
      veterinario: dto.veterinarioId ? ({ id: dto.veterinarioId } as any) : null,
      tipo: dto.tipo,
      estado: 'borrador',
      notas: dto.notas,
    });
    return this.repo.save(e);
  }

  async get(id: string, tenantId: string) {
    const e = await this.repo.findOne({ where: { id, veterinaria: { id: tenantId } } });
    if (!e) throw new NotFoundException('Estudio no encontrado');
    return e;
  }

  async listarPorPaciente(pacienteId: string, tenantId: string) {
    return this.repo.find({
      where: { paciente: { id: pacienteId }, veterinaria: { id: tenantId } },
      order: { createdAt: 'DESC' },
    });
  }
}
