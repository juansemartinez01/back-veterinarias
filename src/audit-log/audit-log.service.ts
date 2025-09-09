import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(@InjectRepository(AuditLog) private readonly repo: Repository<AuditLog>) {}

  async log(input: {
    veterinariaId: string;
    actorUserId?: string | null;
    action: string;
    entityName: string;
    entityId?: string | null;
    before?: any;
    after?: any;
    meta?: any;
  }) {
    const entry = this.repo.create(input);
    await this.repo.save(entry);
  }
}
