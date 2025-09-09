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
exports.NotificacionProgramada = void 0;
const typeorm_1 = require("typeorm");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
const turno_entity_1 = require("../turnos/turno.entity");
let NotificacionProgramada = class NotificacionProgramada {
};
exports.NotificacionProgramada = NotificacionProgramada;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotificacionProgramada.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], NotificacionProgramada.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turno_entity_1.Turno, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'turno_id' }),
    __metadata("design:type", turno_entity_1.Turno)
], NotificacionProgramada.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], NotificacionProgramada.prototype, "canal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: 'scheduled_at_utc' }),
    __metadata("design:type", Date)
], NotificacionProgramada.prototype, "scheduledAtUtc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'pendiente' }),
    __metadata("design:type", String)
], NotificacionProgramada.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'intento_count', default: 0 }),
    __metadata("design:type", Number)
], NotificacionProgramada.prototype, "intentoCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'last_error', nullable: true }),
    __metadata("design:type", String)
], NotificacionProgramada.prototype, "lastError", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'provider_message_id', nullable: true }),
    __metadata("design:type", String)
], NotificacionProgramada.prototype, "providerMessageId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'creado_en' }),
    __metadata("design:type", Date)
], NotificacionProgramada.prototype, "creadoEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', name: 'processed_at', nullable: true }),
    __metadata("design:type", Date)
], NotificacionProgramada.prototype, "processedAt", void 0);
exports.NotificacionProgramada = NotificacionProgramada = __decorate([
    (0, typeorm_1.Entity)('notificacion_programada'),
    (0, typeorm_1.Unique)('uniq_noti_turno', ['veterinaria', 'turno', 'canal', 'scheduledAtUtc']),
    (0, typeorm_1.Index)(['veterinaria', 'scheduledAtUtc'])
], NotificacionProgramada);
//# sourceMappingURL=notificacion-programada.entity.js.map