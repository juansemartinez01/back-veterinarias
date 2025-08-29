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
exports.InsumosController = void 0;
const common_1 = require("@nestjs/common");
const insumos_service_1 = require("./insumos.service");
const create_insumo_dto_1 = require("./dto/create-insumo.dto");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
let InsumosController = class InsumosController {
    constructor(service) {
        this.service = service;
    }
    crear(dto, user) {
        return this.service.crear(dto, { id: user.veterinariaId });
    }
    listar(user) {
        return this.service.listarPorVeterinaria(user.veterinariaId);
    }
    ajustarStock(id, cantidad) {
        return this.service.ajustarStock(id, parseInt(cantidad));
    }
};
exports.InsumosController = InsumosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_insumo_dto_1.CreateInsumoDto, Object]),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "listar", null);
__decorate([
    (0, common_1.Patch)(':id/ajustar/:cantidad'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('cantidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InsumosController.prototype, "ajustarStock", null);
exports.InsumosController = InsumosController = __decorate([
    (0, common_1.Controller)('insumos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [insumos_service_1.InsumosService])
], InsumosController);
//# sourceMappingURL=insumos.controller.js.map