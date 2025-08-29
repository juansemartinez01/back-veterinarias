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
exports.Turno = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../clientes/cliente.entity");
const paciente_entity_1 = require("../pacientes/paciente.entity");
const usuario_entity_1 = require("../usuarios/usuario.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
let Turno = class Turno {
};
exports.Turno = Turno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Turno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Turno.prototype, "fechaHora", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pendiente' }),
    __metadata("design:type", String)
], Turno.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, { eager: true }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Turno.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente, { eager: true }),
    __metadata("design:type", paciente_entity_1.Paciente)
], Turno.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { eager: true }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Turno.prototype, "veterinario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], Turno.prototype, "veterinaria", void 0);
exports.Turno = Turno = __decorate([
    (0, typeorm_1.Entity)()
], Turno);
//# sourceMappingURL=turno.entity.js.map