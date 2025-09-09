// src/media/media-file.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('media_file')
@Index(['veterinaria', 'createdAt'])
export class MediaFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL', eager: true, nullable: true })
  @JoinColumn({ name: 'uploader_user_id' })
  uploader?: Usuario | null;

  // Almacén
  @Column({ name: 's3_key', nullable: true })
  s3Key?: string | null;

  @Column({ name: 'mime', nullable: true })
  mime?: string | null;

  @Column({ name: 'size_bytes', type: 'bigint', nullable: true })
  sizeBytes?: string | null;

  @Column({ name: 'checksum', nullable: true })
  checksum?: string | null;

  // Soporte legado (filesystem)
  @Column({ name: 'legacy_path', nullable: true })
  legacyPath?: string | null;

  @Column({ name: 'original_name', nullable: true })
  originalName?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
