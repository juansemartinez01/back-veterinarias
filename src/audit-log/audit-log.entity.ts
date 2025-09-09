import { Column, Entity, Index } from 'typeorm';
import { BaseTenantEntity } from '../common/entities/base-tenant.entity';

@Entity('audit_log')
@Index(['veterinariaId', 'createdAt'])
export class AuditLog extends BaseTenantEntity {
  @Column({ name: 'actor_user_id', type: 'uuid', nullable: true })
  actorUserId?: string | null;

  @Column()
  action: string; // e.g. 'UPDATE_TURNO', 'CREATE_CONSULTA'

  @Column({ name: 'entity_name' })
  entityName: string; // e.g. 'turno'

  @Column({ name: 'entity_id', type: 'uuid', nullable: true })
  entityId?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  before?: any;

  @Column({ type: 'jsonb', nullable: true })
  after?: any;

  @Column({ type: 'jsonb', nullable: true })
  meta?: any;
}
