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
exports.Estudio = void 0;
const typeorm_1 = require("typeorm");
const paciente_entity_1 = require("../pacientes/paciente.entity");
const consulta_entity_1 = require("../consultas/consulta.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
const usuario_entity_1 = require("../usuarios/usuario.entity");
let Estudio = class Estudio {
};
exports.Estudio = Estudio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Estudio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], Estudio.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente, { onDelete: 'RESTRICT', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'paciente_id' }),
    __metadata("design:type", paciente_entity_1.Paciente)
], Estudio.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consulta_entity_1.Consulta, { onDelete: 'SET NULL', eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'consulta_id' }),
    __metadata("design:type", consulta_entity_1.Consulta)
], Estudio.prototype, "consulta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'SET NULL', eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Estudio.prototype, "veterinario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, default: 'consulta' }),
    __metadata("design:type", String)
], Estudio.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'borrador' }),
    __metadata("design:type", String)
], Estudio.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Estudio.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], Estudio.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", Date)
], Estudio.prototype, "updatedAt", void 0);
exports.Estudio = Estudio = __decorate([
    (0, typeorm_1.Entity)('estudio'),
    (0, typeorm_1.Index)(['veterinaria', 'createdAt'])
], Estudio);
//# sourceMappingURL=estudio.entity.js.map