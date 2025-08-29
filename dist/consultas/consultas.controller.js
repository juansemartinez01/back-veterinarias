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
exports.ConsultasController = void 0;
const common_1 = require("@nestjs/common");
const consultas_service_1 = require("./consultas.service");
const create_consulta_dto_1 = require("./dto/create-consulta.dto");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
let ConsultasController = class ConsultasController {
    constructor(service) {
        this.service = service;
    }
    crear(dto, user) {
        return this.service.crear(dto, user);
    }
    listarPorPaciente(pacienteId, user) {
        return this.service.listarPorPaciente(pacienteId, user.veterinariaId);
    }
};
exports.ConsultasController = ConsultasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consulta_dto_1.CreateConsultaDto, Object]),
    __metadata("design:returntype", void 0)
], ConsultasController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)('paciente/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ConsultasController.prototype, "listarPorPaciente", null);
exports.ConsultasController = ConsultasController = __decorate([
    (0, common_1.Controller)('consultas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [consultas_service_1.ConsultasService])
], ConsultasController);
//# sourceMappingURL=consultas.controller.js.map