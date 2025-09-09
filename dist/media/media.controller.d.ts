import { MediaService } from './media.service';
import { S3Service } from './storage/s3.service';
import { TenantSettingsService } from '../tenant-settings/tenant-settings.service';
export declare class MediaController {
    private readonly media;
    private readonly s3;
    private readonly settings;
    constructor(media: MediaService, s3: S3Service, settings: TenantSettingsService);
    presign(body: {
        filename: string;
        contentType?: string;
        scope: 'paciente' | 'estudio' | 'informe';
        targetId: string;
    }, user: any): Promise<{
        uploadUrl: string;
        key: string;
    }>;
    register(body: {
        key?: string;
        mime?: string;
        sizeBytes?: string;
        checksum?: string;
        originalName?: string;
        legacyPath?: string;
        scope: 'paciente' | 'estudio' | 'informe';
        targetId: string;
    }, user: any): Promise<import("./media-file.entity").MediaFile>;
    list(scope: 'paciente' | 'estudio' | 'informe', targetId: string, user: any): Promise<import("./media-link.entity").MediaLink[]>;
    presignedGet(id: string, user: any): Promise<{
        type: string;
        url: any;
    }>;
}
