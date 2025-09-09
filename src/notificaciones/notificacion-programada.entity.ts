// src/notificaciones/notificacion-programada.entity.ts
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Turno } from '../turnos/turno.entity';

export type NotiEstado = 'pendiente' | 'enviando' | 'enviado' | 'error';
export type Canal = 'email' | 'whatsapp';

@Entity('notificacion_programada')
@Unique('uniq_noti_turno', ['veterinaria', 'turno', 'canal', 'scheduledAtUtc'])
@Index(['veterinaria', 'scheduledAtUtc'])
export class NotificacionProgramada {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @ManyToOne(() => Turno, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'turno_id' })
  turno: Turno;

  @Column({ type: 'varchar', length: 20 })
  canal: Canal;

  @Column({ type: 'timestamptz', name: 'scheduled_at_utc' })
  scheduledAtUtc: Date;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: NotiEstado;

  @Column({ type: 'int', name: 'intento_count', default: 0 })
  intentoCount: number;

  @Column({ type: 'text', name: 'last_error', nullable: true })
  lastError?: string | null;

  @Column({ type: 'text', name: 'provider_message_id', nullable: true })
  providerMessageId?: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'creado_en' })
  creadoEn: Date;

  @Column({ type: 'timestamptz', name: 'processed_at', nullable: true })
  processedAt?: Date | null;
}
