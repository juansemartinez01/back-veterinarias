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
exports.Medicion = void 0;
const typeorm_1 = require("typeorm");
const informe_seccion_entity_1 = require("./informe-seccion.entity");
let Medicion = class Medicion {
};
exports.Medicion = Medicion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Medicion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => informe_seccion_entity_1.InformeSeccion, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'seccion_id' }),
    __metadata("design:type", informe_seccion_entity_1.InformeSeccion)
], Medicion.prototype, "seccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80 }),
    __metadata("design:type", String)
], Medicion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", String)
], Medicion.prototype, "unidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 3, nullable: true }),
    __metadata("design:type", String)
], Medicion.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Medicion.prototype, "referencia", void 0);
exports.Medicion = Medicion = __decorate([
    (0, typeorm_1.Entity)('medicion'),
    (0, typeorm_1.Index)(['seccion', 'nombre'])
], Medicion);
//# sourceMappingURL=medicion.entity.js.map