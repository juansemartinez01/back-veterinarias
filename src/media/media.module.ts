// src/media/media.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFile } from './media-file.entity';
import { MediaLink } from './media-link.entity';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { S3Service } from './storage/s3.service';
import { TenantSettingsModule } from '../tenant-settings/tenant-settings.module';

@Module({
  imports: [TypeOrmModule.forFeature([MediaFile, MediaLink]), TenantSettingsModule],
  controllers: [MediaController],
  providers: [MediaService, S3Service],
  exports: [MediaService],
})
export class MediaModule {}
