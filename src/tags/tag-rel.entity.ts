// src/tags/tag-rel.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { Tag } from './tag.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

export type TagScope = 'paciente' | 'informe' | 'media';

@Entity('tag_rel')
@Unique('uq_tag_rel', ['veterinaria', 'tag', 'scope', 'targetId'])
@Index(['veterinaria', 'scope', 'targetId'])
export class TagRel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @ManyToOne(() => Tag, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @Column({ type: 'varchar', length: 20 })
  scope: TagScope;

  @Column({ name: 'target_id', type: 'uuid' })
  targetId: string;
}
