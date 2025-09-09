// src/plantillas/plantilla-mensaje.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

export type Canal = 'email' | 'whatsapp';

@Entity('plantilla_mensaje')
@Unique(['veterinaria', 'code', 'canal'])
export class PlantillaMensaje {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @Column({ length: 50 })
  code: string; // ej: recordatorio_turno

  @Column({ type: 'varchar', length: 20 })
  canal: Canal;

  @Column({ nullable: true })
  subject?: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'jsonb', nullable: true })
  variables?: string[]; // sugeridas
}
