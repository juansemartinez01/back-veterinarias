import { Repository } from 'typeorm';
import { MediaFile } from './media-file.entity';
import { MediaLink, MediaScope } from './media-link.entity';
import { TenantSettingsService } from '../tenant-settings/tenant-settings.service';
export declare class MediaService {
    private files;
    private links;
    constructor(files: Repository<MediaFile>, links: Repository<MediaLink>);
    register(args: {
        veterinariaId: string;
        uploaderUserId?: string;
        s3Key?: string | null;
        mime?: string | null;
        sizeBytes?: string | null;
        checksum?: string | null;
        originalName?: string | null;
        legacyPath?: string | null;
    }): Promise<MediaFile>;
    attach(veterinariaId: string, mediaId: string, scope: MediaScope, targetId: string): Promise<MediaLink>;
    listByTarget(veterinariaId: string, scope: MediaScope, targetId: string): Promise<MediaLink[]>;
    getDownloadUrl(veterinariaId: string, mediaId: string, settings: TenantSettingsService, s3: {
        presignGet: Function;
    }): Promise<{
        type: string;
        url: any;
    }>;
}
