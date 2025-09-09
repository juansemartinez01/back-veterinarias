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
exports.Informe = void 0;
const typeorm_1 = require("typeorm");
const estudio_entity_1 = require("../estudios/estudio.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
const usuario_entity_1 = require("../usuarios/usuario.entity");
let Informe = class Informe {
};
exports.Informe = Informe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Informe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], Informe.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estudio_entity_1.Estudio, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'estudio_id' }),
    __metadata("design:type", estudio_entity_1.Estudio)
], Informe.prototype, "estudio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'SET NULL', eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'autor_user_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Informe.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Informe.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'borrador' }),
    __metadata("design:type", String)
], Informe.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Informe.prototype, "cuerpo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Informe.prototype, "extra", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], Informe.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', name: 'updated_at' }),
    __metadata("design:type", Date)
], Informe.prototype, "updatedAt", void 0);
exports.Informe = Informe = __decorate([
    (0, typeorm_1.Entity)('informe'),
    (0, typeorm_1.Index)(['estudio', 'version'], { unique: true })
], Informe);
//# sourceMappingURL=informe.entity.js.map