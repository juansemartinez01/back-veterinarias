import { BaseTenantEntity } from '../common/entities/base-tenant.entity';
export declare class AuditLog extends BaseTenantEntity {
    actorUserId?: string | null;
    action: string;
    entityName: string;
    entityId?: string | null;
    before?: any;
    after?: any;
    meta?: any;
}
