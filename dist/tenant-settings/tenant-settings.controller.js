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
exports.TenantSettingsController = void 0;
const common_1 = require("@nestjs/common");
const tenant_settings_service_1 = require("./tenant-settings.service");
const current_tenant_decorator_1 = require("../common/decorators/current-tenant.decorator");
const update_tenant_settings_dto_1 = require("./dto/update-tenant-settings.dto");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
let TenantSettingsController = class TenantSettingsController {
    constructor(service) {
        this.service = service;
    }
    async getMine(tenantId) {
        return this.service.getMine(tenantId);
    }
    async updateMine(tenantId, dto) {
        return this.service.updateMine(tenantId, dto);
    }
};
exports.TenantSettingsController = TenantSettingsController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenantSettingsController.prototype, "getMine", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tenant_settings_dto_1.UpdateTenantSettingsDto]),
    __metadata("design:returntype", Promise)
], TenantSettingsController.prototype, "updateMine", null);
exports.TenantSettingsController = TenantSettingsController = __decorate([
    (0, common_1.Controller)('tenant-settings'),
    (0, common_1.UseGuards)(tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [tenant_settings_service_1.TenantSettingsService])
], TenantSettingsController);
//# sourceMappingURL=tenant-settings.controller.js.map