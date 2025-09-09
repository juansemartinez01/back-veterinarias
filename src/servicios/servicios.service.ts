import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(@InjectRepository(Servicio) private repo: Repository<Servicio>) {}

  async list(tenantId: string) {
    return this.repo.find({ where: { veterinariaId: tenantId, activo: true } });
  }

  async get(tenantId: string, id: string) {
    const s = await this.repo.findOne({ where: { id, veterinariaId: tenantId } });
    if (!s) throw new NotFoundException('Servicio no encontrado');
    return s;
  }

  async create(tenantId: string, dto: Partial<Servicio>) {
    if (dto.code) {
      const dup = await this.repo.findOne({ where: { veterinariaId: tenantId, code: dto.code } });
      if (dup) throw new ConflictException('code duplicado en este tenant');
    }
    const s = this.repo.create({ ...dto, veterinariaId: tenantId });
    return this.repo.save(s);
  }

  async update(tenantId: string, id: string, dto: Partial<Servicio>) {
    const s = await this.get(tenantId, id);
    if (dto.code && dto.code !== s.code) {
      const dup = await this.repo.findOne({ where: { veterinariaId: tenantId, code: dto.code } });
      if (dup) throw new ConflictException('code duplicado en este tenant');
    }
    Object.assign(s, dto);
    return this.repo.save(s);
  }

  async remove(tenantId: string, id: string) {
    const s = await this.get(tenantId, id);
    s.activo = false;
    return this.repo.save(s);
  }
}
