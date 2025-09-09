// src/tags/tag.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Entity('tag')
@Unique(['veterinaria', 'name'])
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 10, nullable: true })
  color?: string | null;
}
