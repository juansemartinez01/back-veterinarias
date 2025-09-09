import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { RbacService } from './rbac.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private rbac: RbacService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) throw new UnauthorizedException('No autenticado');

    const tenantId = user.veterinariaId;
    if (!tenantId) throw new ForbiddenException('Falta tenant');

    const totalRoles = await this.rbac.countRoles();
    if (totalRoles === 0) {
      // Permitir crear el primer rol sin validar
      return true;
    }


    const has = await this.rbac.userHasAnyRole(user.id, tenantId, required);
    if (!has) throw new ForbiddenException('Rol insuficiente');
    return true;
    }
}
