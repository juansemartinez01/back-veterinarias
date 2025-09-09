// src/turnos-estado/turno-historial-estado.entity.ts
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Turno } from '../turnos/turno.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

export type TurnoEstado = 'pendiente' | 'confirmado' | 'atendido' | 'cancelado' | 'no_asistio';

@Entity('turno_historial_estado')
export class TurnoHistorialEstado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Turno, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'turno_id' })
  turno: Turno;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL', eager: true, nullable: true })
  @JoinColumn({ name: 'actor_user_id' })
  actor?: Usuario | null;

  @Column({ type: 'varchar', length: 20 })
  fromEstado: TurnoEstado;

  

  @Column({ type: 'varchar', length: 20 })
  toEstado: TurnoEstado;

  @Column({ type: 'text', nullable: true })
  motivo?: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'cambiado_en' })
  cambiadoEn: Date;
}
