// src/media/media-link.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { MediaFile } from './media-file.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

export type MediaScope = 'paciente' | 'estudio' | 'informe';

@Entity('media_link')
@Unique('uq_media_link', ['veterinaria', 'media', 'scope', 'targetId'])
@Index(['veterinaria', 'scope', 'targetId'])
export class MediaLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @ManyToOne(() => MediaFile, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'media_id' })
  media: MediaFile;

  @Column({ type: 'varchar', length: 20 })
  scope: MediaScope; // paciente | estudio | informe

  @Column({ name: 'target_id', type: 'uuid' })
  targetId: string;
}
