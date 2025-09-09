// src/informes/informe.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Estudio } from '../estudios/estudio.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Usuario } from '../usuarios/usuario.entity';

export type InformeEstado = 'borrador' | 'final';

@Entity('informe')
@Index(['estudio', 'version'], { unique: true })
export class Informe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @ManyToOne(() => Estudio, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'estudio_id' })
  estudio: Estudio;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL', eager: true, nullable: true })
  @JoinColumn({ name: 'autor_user_id' })
  autor?: Usuario | null;

  @Column({ type: 'int' })
  version: number;

  @Column({ type: 'varchar', length: 20, default: 'borrador' })
  estado: InformeEstado;

  // Texto libre (por si querés all-in-one)
  @Column({ type: 'text', nullable: true })
  cuerpo?: string | null;

  // Para guardar estructuras/valores libres (no críticas)
  @Column({ type: 'jsonb', nullable: true })
  extra?: any;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
