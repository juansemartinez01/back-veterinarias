import { TenantSettingsService } from './tenant-settings.service';
import { UpdateTenantSettingsDto } from './dto/update-tenant-settings.dto';
export declare class TenantSettingsController {
    private readonly service;
    constructor(service: TenantSettingsService);
    getMine(tenantId: string): Promise<import("./tenant-settings.entity").TenantSettings>;
    updateMine(tenantId: string, dto: UpdateTenantSettingsDto): Promise<import("./tenant-settings.entity").TenantSettings>;
}
