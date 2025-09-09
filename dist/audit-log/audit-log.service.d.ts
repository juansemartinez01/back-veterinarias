import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
export declare class AuditLogService {
    private readonly repo;
    constructor(repo: Repository<AuditLog>);
    log(input: {
        veterinariaId: string;
        actorUserId?: string | null;
        action: string;
        entityName: string;
        entityId?: string | null;
        before?: any;
        after?: any;
        meta?: any;
    }): Promise<void>;
}
