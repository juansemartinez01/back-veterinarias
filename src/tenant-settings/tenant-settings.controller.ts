import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { TenantSettingsService } from './tenant-settings.service';
import { CurrentTenant } from '../common/decorators/current-tenant.decorator';
import { UpdateTenantSettingsDto } from './dto/update-tenant-settings.dto';

// usá tu guard de auth si lo tenés (ej. JwtAuthGuard) y tu TenantGuard
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';

@Controller('tenant-settings')
@UseGuards(TenantGuard /*, JwtAuthGuard*/)
export class TenantSettingsController {
  constructor(private readonly service: TenantSettingsService) {}

  @Get('me')
  async getMine(@CurrentTenant() tenantId: string) {
    return this.service.getMine(tenantId);
  }

  @Patch('me')
  async updateMine(@CurrentTenant() tenantId: string, @Body() dto: UpdateTenantSettingsDto) {
    return this.service.updateMine(tenantId, dto);
  }
}
