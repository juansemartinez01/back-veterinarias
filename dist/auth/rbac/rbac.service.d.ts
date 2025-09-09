import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { UserRole } from './user-role.entity';
export declare class RbacService {
    private rolesRepo;
    private permsRepo;
    private userRoleRepo;
    constructor(rolesRepo: Repository<Role>, permsRepo: Repository<Permission>, userRoleRepo: Repository<UserRole>);
    createRole(name: string, permissionCodes?: string[], isSystem?: boolean): Promise<Role>;
    ensurePermissions(codes: string[]): Promise<void>;
    assignRoleToUser(usuarioId: string, roleId: string, veterinariaId: string): Promise<UserRole>;
    removeRoleFromUser(usuarioId: string, roleId: string, veterinariaId: string): Promise<void>;
    getUserRoles(usuarioId: string, veterinariaId: string): Promise<Role[]>;
    userHasAnyRole(usuarioId: string, veterinariaId: string, roles: string[]): Promise<boolean>;
}
