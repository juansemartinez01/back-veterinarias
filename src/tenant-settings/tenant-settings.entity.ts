import { Column, Entity, Unique } from 'typeorm';
import { BaseTenantEntity } from '../common/entities/base-tenant.entity';

@Entity('tenant_settings')
@Unique(['veterinariaId'])
export class TenantSettings extends BaseTenantEntity {
  @Column({ default: 'America/Argentina/Cordoba' })
  timezone: string;

  @Column({ type: 'int', name: 'reminder_hours_before', default: 24 })
  reminderHoursBefore: number;

  @Column({ type: 'jsonb', name: 'reminder_channels', default: () => `'{"email": true, "whatsapp": false}'` })
  reminderChannels: { email: boolean; whatsapp: boolean };

  @Column({ name: 'from_email', nullable: true })
  fromEmail?: string;

  @Column({ name: 'whatsapp_from', nullable: true })
  whatsappFrom?: string;

  @Column({ name: 's3_bucket', nullable: true })
  s3Bucket?: string;

  @Column({ name: 's3_prefix', nullable: true })
  s3Prefix?: string;

  @Column({ name: 'ai_enabled', type: 'boolean', default: false })
  aiEnabled: boolean;
}
