// src/informes/medicion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { InformeSeccion } from './informe-seccion.entity';

@Entity('medicion')
@Index(['seccion', 'nombre'])
export class Medicion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InformeSeccion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seccion_id' })
  seccion: InformeSeccion;

  @Column({ type: 'varchar', length: 80 })
  nombre: string; // p.ej. "Diámetro"

  @Column({ type: 'varchar', length: 40, nullable: true })
  unidad?: string | null; // "mm", "cm", etc.

  @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
  valor?: string | null;

  @Column({ type: 'text', nullable: true })
  referencia?: string | null; // rango u observación
}
