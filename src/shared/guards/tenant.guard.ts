import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    // Aquí podrías validar más condiciones si fuera necesario
    return !!user && !!user.veterinariaId;
  }
}
