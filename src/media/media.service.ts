// src/media/media.service.ts
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaFile } from './media-file.entity';
import { MediaLink, MediaScope } from './media-link.entity';
import { TenantSettingsService } from '../tenant-settings/tenant-settings.service';
import { Paciente } from '../pacientes/paciente.entity';
import { Estudio } from '../estudios/estudio.entity';
import { Informe } from '../informes/informe.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaFile) private files: Repository<MediaFile>,
    @InjectRepository(MediaLink) private links: Repository<MediaLink>,
  ) {}

  async register(args: {
    veterinariaId: string;
    uploaderUserId?: string;
    s3Key?: string | null;
    mime?: string | null;
    sizeBytes?: string | null;
    checksum?: string | null;
    originalName?: string | null;
    legacyPath?: string | null;
  }) {
    const f = this.files.create({
      veterinaria: { id: args.veterinariaId } as any,
      uploader: args.uploaderUserId ? ({ id: args.uploaderUserId } as any) : null,
      s3Key: args.s3Key ?? null,
      mime: args.mime ?? null,
      sizeBytes: args.sizeBytes ?? null,
      checksum: args.checksum ?? null,
      originalName: args.originalName ?? null,
      legacyPath: args.legacyPath ?? null,
    });
    return this.files.save(f);
  }

  async attach(veterinariaId: string, mediaId: string, scope: MediaScope, targetId: string) {
    const media = await this.files.findOne({ where: { id: mediaId, veterinaria: { id: veterinariaId } } });
    if (!media) throw new NotFoundException('Media no encontrada');

    const exists = await this.links.findOne({ where: { veterinaria: { id: veterinariaId }, media: { id: mediaId }, scope, targetId } });
    if (exists) return exists;

    const link = this.links.create({
      veterinaria: { id: veterinariaId } as any,
      media: { id: mediaId } as any,
      scope,
      targetId,
    });
    return this.links.save(link);
  }

  async listByTarget(veterinariaId: string, scope: MediaScope, targetId: string) {
    return this.links.find({
      where: { veterinaria: { id: veterinariaId }, scope, targetId },
      order: { id: 'ASC' },
    });
  }

  async getDownloadUrl(veterinariaId: string, mediaId: string, settings: TenantSettingsService, s3: { presignGet: Function }) {
  const file = await this.files.findOne({ where: { id: mediaId, veterinaria: { id: veterinariaId } } });
  if (!file) throw new NotFoundException('Media no encontrada');

  // Preferimos S3 si existe
  if (file.s3Key) {
    const conf = await settings.getMine(veterinariaId);
    const bucket = conf.s3Bucket || process.env.S3_BUCKET!;
    const { url } = await (s3 as any).presignGet({ bucket, key: file.s3Key, expiresSec: 900 });
    return { type: 's3', url };
  }

  // Legacy (filesystem). Requiere serve-static o un proxy en el front.
  if (file.legacyPath) {
    // Si legacyPath es 'uploads/archivo.jpg', devolvemos '/uploads/archivo.jpg'
    const base = process.env.UPLOADS_PUBLIC_BASE || '/';
    const normalized = file.legacyPath.startsWith('/') ? file.legacyPath : `/${file.legacyPath}`;
    return { type: 'legacy', url: base.endsWith('/') ? base.slice(0, -1) + normalized : base + normalized };
  }

  throw new NotFoundException('Media sin ubicación disponible');
}
}
