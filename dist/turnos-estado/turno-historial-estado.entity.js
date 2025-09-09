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
exports.TurnoHistorialEstado = void 0;
const typeorm_1 = require("typeorm");
const turno_entity_1 = require("../turnos/turno.entity");
const usuario_entity_1 = require("../usuarios/usuario.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
let TurnoHistorialEstado = class TurnoHistorialEstado {
};
exports.TurnoHistorialEstado = TurnoHistorialEstado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TurnoHistorialEstado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turno_entity_1.Turno, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'turno_id' }),
    __metadata("design:type", turno_entity_1.Turno)
], TurnoHistorialEstado.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], TurnoHistorialEstado.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'SET NULL', eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'actor_user_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], TurnoHistorialEstado.prototype, "actor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TurnoHistorialEstado.prototype, "fromEstado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TurnoHistorialEstado.prototype, "toEstado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TurnoHistorialEstado.prototype, "motivo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'cambiado_en' }),
    __metadata("design:type", Date)
], TurnoHistorialEstado.prototype, "cambiadoEn", void 0);
exports.TurnoHistorialEstado = TurnoHistorialEstado = __decorate([
    (0, typeorm_1.Entity)('turno_historial_estado')
], TurnoHistorialEstado);
//# sourceMappingURL=turno-historial-estado.entity.js.map