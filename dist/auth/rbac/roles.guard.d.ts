import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacService } from './rbac.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private rbac;
    constructor(reflector: Reflector, rbac: RbacService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
