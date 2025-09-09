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
exports.InformesController = void 0;
const common_1 = require("@nestjs/common");
const informes_service_1 = require("./informes.service");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
const create_informe_dto_1 = require("./dto/create-informe.dto");
const finalizar_informe_dto_1 = require("./dto/finalizar-informe.dto");
let InformesController = class InformesController {
    constructor(service) {
        this.service = service;
    }
    crear(estudioId, dto, user) {
        return this.service.crear(user.veterinariaId, estudioId, user === null || user === void 0 ? void 0 : user.id, dto);
    }
    detalle(informeId, user) {
        return this.service.detalle(informeId, user.veterinariaId);
    }
    versiones(estudioId, user) {
        return this.service.versiones(estudioId, user.veterinariaId);
    }
    finalizar(informeId, body, user) {
        return this.service.finalizar(informeId, user.veterinariaId, body.confirmar);
    }
};
exports.InformesController = InformesController;
__decorate([
    (0, common_1.Post)(':estudioId'),
    __param(0, (0, common_1.Param)('estudioId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_informe_dto_1.CreateInformeDto, Object]),
    __metadata("design:returntype", void 0)
], InformesController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(':informeId'),
    __param(0, (0, common_1.Param)('informeId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InformesController.prototype, "detalle", null);
__decorate([
    (0, common_1.Get)('estudio/:estudioId/versiones'),
    __param(0, (0, common_1.Param)('estudioId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InformesController.prototype, "versiones", null);
__decorate([
    (0, common_1.Patch)(':informeId/finalizar'),
    __param(0, (0, common_1.Param)('informeId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, finalizar_informe_dto_1.FinalizarInformeDto, Object]),
    __metadata("design:returntype", void 0)
], InformesController.prototype, "finalizar", null);
exports.InformesController = InformesController = __decorate([
    (0, common_1.Controller)('informes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [informes_service_1.InformesService])
], InformesController);
//# sourceMappingURL=informes.controller.js.map