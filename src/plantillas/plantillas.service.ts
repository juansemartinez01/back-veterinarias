// src/plantillas/plantillas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantillaMensaje } from './plantilla-mensaje.entity';

@Injectable()
export class PlantillasService {
  constructor(@InjectRepository(PlantillaMensaje) private repo: Repository<PlantillaMensaje>) {}

  async list(veterinariaId: string) {
    return this.repo.find({ where: { veterinaria: { id: veterinariaId } } });
  }

  async upsert(veterinariaId: string, dto: Partial<PlantillaMensaje>) {
    let p = await this.repo.findOne({ where: { veterinaria: { id: veterinariaId }, code: dto.code, canal: dto.canal } });
    if (!p) {
      p = this.repo.create({ ...dto, veterinaria: { id: veterinariaId } as any });
    } else {
      Object.assign(p, dto);
    }
    return this.repo.save(p);
  }

  async get(veterinariaId: string, code: string, canal: 'email' | 'whatsapp') {
    const p = await this.repo.findOne({ where: { veterinaria: { id: veterinariaId }, code, canal } });
    if (!p) throw new NotFoundException('Plantilla no encontrada');
    return p;
  }
}
