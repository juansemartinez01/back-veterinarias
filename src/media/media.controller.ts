// src/media/media.controller.ts
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { MediaService } from './media.service';
import { S3Service } from './storage/s3.service';
import { TenantSettingsService } from '../tenant-settings/tenant-settings.service';

@Controller('media')
@UseGuards(JwtAuthGuard, TenantGuard)
export class MediaController {
  constructor(
    private readonly media: MediaService,
    private readonly s3: S3Service,
    private readonly settings: TenantSettingsService,
  ) {}

  // 1) Presign para subir directo a S3
  @Post('presign')
  async presign(
    @Body() body: { filename: string; contentType?: string; scope: 'paciente'|'estudio'|'informe'; targetId: string },
    @CurrentUser() user: any,
  ) {
    const conf = await this.settings.getMine(user.veterinariaId);
    const bucket = conf.s3Bucket || process.env.S3_BUCKET!;
    const prefix = (conf.s3Prefix || 'uploads') + `/${user.veterinariaId}/${body.scope}/${body.targetId}/`;
    const key = prefix + body.filename;

    const { url } = await this.s3.presignPut({ bucket, key, contentType: body.contentType });
    return { uploadUrl: url, key };
  }

  // 2) Registrar luego de subir a S3 (o para legacy)
  @Post('register')
  async register(
    @Body()
    body: {
      key?: string;
      mime?: string;
      sizeBytes?: string;
      checksum?: string;
      originalName?: string;
      legacyPath?: string; // para migración local
      scope: 'paciente'|'estudio'|'informe';
      targetId: string;
    },
    @CurrentUser() user: any,
  ) {
    const file = await this.media.register({
      veterinariaId: user.veterinariaId,
      uploaderUserId: user.id,
      s3Key: body.key ?? null,
      mime: body.mime ?? null,
      sizeBytes: body.sizeBytes ?? null,
      checksum: body.checksum ?? null,
      originalName: body.originalName ?? null,
      legacyPath: body.legacyPath ?? null,
    });
    await this.media.attach(user.veterinariaId, file.id, body.scope, body.targetId);
    return file;
  }

  // 3) Listar adjuntos por origen
  @Get(':scope/:targetId')
  async list(
    @Param('scope') scope: 'paciente'|'estudio'|'informe',
    @Param('targetId') targetId: string,
    @CurrentUser() user: any,
  ) {
    return this.media.listByTarget(user.veterinariaId, scope, targetId);
  }

  @Get('file/:id/url')
    async presignedGet(@Param('id') id: string, @CurrentUser() user: any) {
    return this.media.getDownloadUrl(user.veterinariaId, id, this.settings, this.s3);
    }
}
