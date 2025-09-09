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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettings = void 0;
const typeorm_1 = require("typeorm");
const base_tenant_entity_1 = require("../common/entities/base-tenant.entity");
let TenantSettings = class TenantSettings extends base_tenant_entity_1.BaseTenantEntity {
};
exports.TenantSettings = TenantSettings;
__decorate([
    (0, typeorm_1.Column)({ default: 'America/Argentina/Cordoba' }),
    __metadata("design:type", String)
], TenantSettings.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'reminder_hours_before', default: 24 }),
    __metadata("design:type", Number)
], TenantSettings.prototype, "reminderHoursBefore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'reminder_channels', default: () => `'{"email": true, "whatsapp": false}'` }),
    __metadata("design:type", Object)
], TenantSettings.prototype, "reminderChannels", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'from_email', nullable: true }),
    __metadata("design:type", String)
], TenantSettings.prototype, "fromEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'whatsapp_from', nullable: true }),
    __metadata("design:type", String)
], TenantSettings.prototype, "whatsappFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 's3_bucket', nullable: true }),
    __metadata("design:type", String)
], TenantSettings.prototype, "s3Bucket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 's3_prefix', nullable: true }),
    __metadata("design:type", String)
], TenantSettings.prototype, "s3Prefix", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ai_enabled', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], TenantSettings.prototype, "aiEnabled", void 0);
exports.TenantSettings = TenantSettings = __decorate([
    (0, typeorm_1.Entity)('tenant_settings'),
    (0, typeorm_1.Unique)(['veterinariaId'])
], TenantSettings);
//# sourceMappingURL=tenant-settings.entity.js.map