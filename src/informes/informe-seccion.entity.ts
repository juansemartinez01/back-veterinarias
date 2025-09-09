// src/informes/informe-seccion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Informe } from './informe.entity';

@Entity('informe_seccion')
@Index(['informe', 'orden'])
export class InformeSeccion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Informe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'informe_id' })
  informe: Informe;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @Column({ type: 'varchar', length: 80 })
  nombre: string; // p.ej. "Hígado", "Bazo", "Riñones"

  @Column({ type: 'text', nullable: true })
  texto?: string | null;
}
