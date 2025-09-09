"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./role.entity");
const permission_entity_1 = require("./permission.entity");
const user_role_entity_1 = require("./user-role.entity");
let RbacService = class RbacService {
    constructor(rolesRepo, permsRepo, userRoleRepo) {
        this.rolesRepo = rolesRepo;
        this.permsRepo = permsRepo;
        this.userRoleRepo = userRoleRepo;
    }
    async createRole(name, permissionCodes = [], isSystem = false) {
        const perms = permissionCodes.length
            ? await this.permsRepo.find({ where: { code: (0, typeorm_2.In)(permissionCodes) } })
            : [];
        const role = this.rolesRepo.create({ name, permissions: perms, isSystem });
        return this.rolesRepo.save(role);
    }
    async ensurePermissions(codes) {
        for (const code of codes) {
            const exists = await this.permsRepo.findOne({ where: { code } });
            if (!exists) {
                await this.permsRepo.save(this.permsRepo.create({ code }));
            }
        }
    }
    async assignRoleToUser(usuarioId, roleId, veterinariaId) {
        const exists = await this.userRoleRepo.findOne({ where: { usuarioId, roleId, veterinariaId } });
        if (exists)
            return exists;
        const ur = this.userRoleRepo.create({ usuarioId, roleId, veterinariaId });
        return this.userRoleRepo.save(ur);
    }
    async removeRoleFromUser(usuarioId, roleId, veterinariaId) {
        await this.userRoleRepo.delete({ usuarioId, roleId, veterinariaId });
    }
    async getUserRoles(usuarioId, veterinariaId) {
        const rows = await this.userRoleRepo.find({ where: { usuarioId, veterinariaId }, relations: ['role'] });
        return rows.map(r => r.role);
    }
    async userHasAnyRole(usuarioId, veterinariaId, roles) {
        const have = await this.getUserRoles(usuarioId, veterinariaId);
        const names = new Set(have.map(r => r.name));
        return roles.some(r => names.has(r));
    }
};
exports.RbacService = RbacService;
exports.RbacService = RbacService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RbacService);
//# sourceMappingURL=rbac.service.js.map