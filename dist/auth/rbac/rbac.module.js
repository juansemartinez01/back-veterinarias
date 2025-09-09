"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./role.entity");
const permission_entity_1 = require("./permission.entity");
const user_role_entity_1 = require("./user-role.entity");
const rbac_service_1 = require("./rbac.service");
const rbac_controller_1 = require("./rbac.controller");
const roles_guard_1 = require("./roles.guard");
let RbacModule = class RbacModule {
};
exports.RbacModule = RbacModule;
exports.RbacModule = RbacModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role, permission_entity_1.Permission, user_role_entity_1.UserRole])],
        providers: [rbac_service_1.RbacService, roles_guard_1.RolesGuard],
        controllers: [rbac_controller_1.RbacController],
        exports: [rbac_service_1.RbacService, roles_guard_1.RolesGuard],
    })
], RbacModule);
//# sourceMappingURL=rbac.module.js.map