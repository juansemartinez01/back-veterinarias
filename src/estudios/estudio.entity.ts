// src/estudios/estudio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Consulta } from '../consultas/consulta.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Usuario } from '../usuarios/usuario.entity';

export type EstudioTipo = 'eco_abdomen' | 'eco_torax' | 'rx' | 'control' | 'consulta';

export type EstudioEstado = 'borrador' | 'finalizado' | 'anulado';

@Entity('estudio')
@Index(['veterinaria', 'createdAt'])
export class Estudio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // tenant
  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  // contexto clínico
  @ManyToOne(() => Paciente, { onDelete: 'RESTRICT', eager: true })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @ManyToOne(() => Consulta, { onDelete: 'SET NULL', eager: true, nullable: true })
  @JoinColumn({ name: 'consulta_id' })
  consulta?: Consulta | null;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL', eager: true, nullable: true })
  @JoinColumn({ name: 'veterinario_id' })
  veterinario?: Usuario | null;

  // tipificación & estado
  @Column({ type: 'varchar', length: 40, default: 'consulta' })
  tipo: EstudioTipo;

  @Column({ type: 'varchar', length: 20, default: 'borrador' })
  estado: EstudioEstado;

  @Column({ type: 'text', nullable: true })
  notas?: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
