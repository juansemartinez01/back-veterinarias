import { Repository } from 'typeorm';
import { TenantSettings } from './tenant-settings.entity';
import { UpdateTenantSettingsDto } from './dto/update-tenant-settings.dto';
export declare class TenantSettingsService {
    private readonly repo;
    constructor(repo: Repository<TenantSettings>);
    getMine(veterinariaId: string): Promise<TenantSettings>;
    updateMine(veterinariaId: string, dto: UpdateTenantSettingsDto): Promise<TenantSettings>;
}
