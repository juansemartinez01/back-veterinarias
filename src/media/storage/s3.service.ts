// src/media/storage/s3.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: process.env.AWS_ACCESS_KEY_ID
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        }
      : undefined,
  });

  async presignPut(params: { bucket: string; key: string; contentType?: string; expiresSec?: number }) {
    const cmd = new PutObjectCommand({
      Bucket: params.bucket,
      Key: params.key,
      ContentType: params.contentType,
    });
    const url = await getSignedUrl(this.client, cmd, { expiresIn: params.expiresSec ?? 900 });
    return { url, key: params.key };
  }

  async presignGet(params: { bucket: string; key: string; expiresSec?: number }) {
    const cmd = new GetObjectCommand({
      Bucket: params.bucket,
      Key: params.key,
    });
    const url = await getSignedUrl(this.client, cmd, { expiresIn: params.expiresSec ?? 900 });
    return { url };
  }
}
