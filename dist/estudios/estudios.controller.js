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
exports.EstudiosController = void 0;
const common_1 = require("@nestjs/common");
const estudios_service_1 = require("./estudios.service");
const create_estudio_dto_1 = require("./dto/create-estudio.dto");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
let EstudiosController = class EstudiosController {
    constructor(service) {
        this.service = service;
    }
    crear(dto, user) {
        return this.service.crear(user.veterinariaId, dto);
    }
    get(id, user) {
        return this.service.get(id, user.veterinariaId);
    }
    listarPorPaciente(pacienteId, user) {
        return this.service.listarPorPaciente(pacienteId, user.veterinariaId);
    }
};
exports.EstudiosController = EstudiosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estudio_dto_1.CreateEstudioDto, Object]),
    __metadata("design:returntype", void 0)
], EstudiosController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EstudiosController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('paciente/:pacienteId'),
    __param(0, (0, common_1.Param)('pacienteId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EstudiosController.prototype, "listarPorPaciente", null);
exports.EstudiosController = EstudiosController = __decorate([
    (0, common_1.Controller)('estudios'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [estudios_service_1.EstudiosService])
], EstudiosController);
//# sourceMappingURL=estudios.controller.js.map