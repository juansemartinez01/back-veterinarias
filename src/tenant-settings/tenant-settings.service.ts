import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantSettings } from './tenant-settings.entity';
import { UpdateTenantSettingsDto } from './dto/update-tenant-settings.dto';

@Injectable()
export class TenantSettingsService {
  constructor(
    @InjectRepository(TenantSettings)
    private readonly repo: Repository<TenantSettings>,
  ) {}

  async getMine(veterinariaId: string): Promise<TenantSettings> {
    let s = await this.repo.findOne({ where: { veterinariaId } });
    if (!s) {
      s = this.repo.create({ veterinariaId });
      s = await this.repo.save(s);
    }
    return s;
  }

  async updateMine(veterinariaId: string, dto: UpdateTenantSettingsDto): Promise<TenantSettings> {
    const s = await this.getMine(veterinariaId);
    Object.assign(s, dto);
    return this.repo.save(s);
  }
}
