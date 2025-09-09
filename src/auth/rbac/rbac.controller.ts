import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('rbac')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RbacController {
  constructor(private readonly rbac: RbacService) {}

  @Post('role')
  @Roles('admin')
  async createRole(@Body() body: { name: string; permissions?: string[]; isSystem?: boolean }) {
    await this.rbac.ensurePermissions(body.permissions ?? []);
    return this.rbac.createRole(body.name, body.permissions ?? [], !!body.isSystem);
  }

  @Post('assign')
  @Roles('admin')
  async assign(@Body() body: { usuarioId: string; roleId: string; veterinariaId: string }) {
    return this.rbac.assignRoleToUser(body.usuarioId, body.roleId, body.veterinariaId);
  }
}
