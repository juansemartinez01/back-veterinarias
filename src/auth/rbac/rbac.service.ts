import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { UserRole } from './user-role.entity';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
    @InjectRepository(Permission) private permsRepo: Repository<Permission>,
    @InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>,
  ) {}

  // ===== Roles & Permisos =====
  async createRole(name: string, permissionCodes: string[] = [], isSystem = false) {
    const perms = permissionCodes.length
      ? await this.permsRepo.find({ where: { code: In(permissionCodes) } })
      : [];
    const role = this.rolesRepo.create({ name, permissions: perms, isSystem });
    return this.rolesRepo.save(role);
  }

  async ensurePermissions(codes: string[]) {
    for (const code of codes) {
      const exists = await this.permsRepo.findOne({ where: { code } });
      if (!exists) {
        await this.permsRepo.save(this.permsRepo.create({ code }));
      }
    }
  }

  // ===== Asignación por usuario/tenant =====
  async assignRoleToUser(usuarioId: string, roleId: string, veterinariaId: string) {
    const exists = await this.userRoleRepo.findOne({ where: { usuarioId, roleId, veterinariaId } });
    if (exists) return exists;
    const ur = this.userRoleRepo.create({ usuarioId, roleId, veterinariaId });
    return this.userRoleRepo.save(ur);
  }

  async removeRoleFromUser(usuarioId: string, roleId: string, veterinariaId: string) {
    await this.userRoleRepo.delete({ usuarioId, roleId, veterinariaId });
  }

  async getUserRoles(usuarioId: string, veterinariaId: string): Promise<Role[]> {
    const rows = await this.userRoleRepo.find({ where: { usuarioId, veterinariaId }, relations: ['role'] });
    return rows.map(r => r.role);
  }

  async userHasAnyRole(usuarioId: string, veterinariaId: string, roles: string[]): Promise<boolean> {
    const have = await this.getUserRoles(usuarioId, veterinariaId);
    const names = new Set(have.map(r => r.name));
    return roles.some(r => names.has(r));
  }
}
