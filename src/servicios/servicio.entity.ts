import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique } from 'typeorm';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Entity('servicio')
@Unique(['veterinariaId', 'code'])
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'veterinaria_id' })
  veterinariaId: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @Column({ length: 80 })
  nombre: string;

  @Column({ length: 40, default: 'consulta' })
  code: string; // ej: 'eco_abdomen', 'control', 'consulta'

  @Column({ type: 'int', name: 'duracion_min', default: 30 })
  duracionMin: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, name: 'precio_base', default: 0 })
  precioBase: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
}
