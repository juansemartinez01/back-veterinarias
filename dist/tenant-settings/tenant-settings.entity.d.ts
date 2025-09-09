import { BaseTenantEntity } from '../common/entities/base-tenant.entity';
export declare class TenantSettings extends BaseTenantEntity {
    timezone: string;
    reminderHoursBefore: number;
    reminderChannels: {
        email: boolean;
        whatsapp: boolean;
    };
    fromEmail?: string;
    whatsappFrom?: string;
    s3Bucket?: string;
    s3Prefix?: string;
    aiEnabled: boolean;
}
