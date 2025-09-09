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
exports.Servicio = void 0;
const typeorm_1 = require("typeorm");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
let Servicio = class Servicio {
};
exports.Servicio = Servicio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Servicio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'uuid', name: 'veterinaria_id' }),
    __metadata("design:type", String)
], Servicio.prototype, "veterinariaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], Servicio.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], Servicio.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40, default: 'consulta' }),
    __metadata("design:type", String)
], Servicio.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'duracion_min', default: 30 }),
    __metadata("design:type", Number)
], Servicio.prototype, "duracionMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, name: 'precio_base', default: 0 }),
    __metadata("design:type", String)
], Servicio.prototype, "precioBase", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Servicio.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], Servicio.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", Date)
], Servicio.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz', name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], Servicio.prototype, "deletedAt", void 0);
exports.Servicio = Servicio = __decorate([
    (0, typeorm_1.Entity)('servicio'),
    (0, typeorm_1.Unique)(['veterinariaId', 'code'])
], Servicio);
//# sourceMappingURL=servicio.entity.js.map