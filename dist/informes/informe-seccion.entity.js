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
exports.InformeSeccion = void 0;
const typeorm_1 = require("typeorm");
const informe_entity_1 = require("./informe.entity");
let InformeSeccion = class InformeSeccion {
};
exports.InformeSeccion = InformeSeccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InformeSeccion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => informe_entity_1.Informe, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'informe_id' }),
    __metadata("design:type", informe_entity_1.Informe)
], InformeSeccion.prototype, "informe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], InformeSeccion.prototype, "orden", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80 }),
    __metadata("design:type", String)
], InformeSeccion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], InformeSeccion.prototype, "texto", void 0);
exports.InformeSeccion = InformeSeccion = __decorate([
    (0, typeorm_1.Entity)('informe_seccion'),
    (0, typeorm_1.Index)(['informe', 'orden'])
], InformeSeccion);
//# sourceMappingURL=informe-seccion.entity.js.map