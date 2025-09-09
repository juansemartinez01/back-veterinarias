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
exports.ServiciosController = void 0;
const common_1 = require("@nestjs/common");
const servicios_service_1 = require("./servicios.service");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/rbac/roles.guard");
const roles_decorator_1 = require("../auth/rbac/roles.decorator");
const create_servicio_dto_1 = require("./dto/create-servicio.dto");
const update_servicio_dto_1 = require("./dto/update-servicio.dto");
let ServiciosController = class ServiciosController {
    constructor(service) {
        this.service = service;
    }
    async list(_p, req) {
        const tenantId = req.user.veterinariaId;
        return this.service.list(tenantId);
    }
    async get(id, req) {
        const tenantId = req.user.veterinariaId;
        return this.service.get(tenantId, id);
    }
    async create(dto, req) {
        const tenantId = req.user.veterinariaId;
        return this.service.create(tenantId, dto);
    }
    async update(id, dto, req) {
        const tenantId = req.user.veterinariaId;
        return this.service.update(tenantId, id, dto);
    }
};
exports.ServiciosController = ServiciosController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_servicio_dto_1.CreateServicioDto, Object]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_servicio_dto_1.UpdateServicioDto, Object]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "update", null);
exports.ServiciosController = ServiciosController = __decorate([
    (0, common_1.Controller)('servicios'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [servicios_service_1.ServiciosService])
], ServiciosController);
//# sourceMappingURL=servicios.controller.js.map