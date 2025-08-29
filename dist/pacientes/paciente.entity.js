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
exports.Paciente = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../clientes/cliente.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
const imagen_paciente_entity_1 = require("../imagenes/imagen-paciente.entity");
let Paciente = class Paciente {
};
exports.Paciente = Paciente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Paciente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "especie", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "raza", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Paciente.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, cliente => cliente.pacientes, { eager: true }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Paciente.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { eager: true }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], Paciente.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => imagen_paciente_entity_1.ImagenPaciente, imagen => imagen.paciente),
    __metadata("design:type", Array)
], Paciente.prototype, "imagenes", void 0);
exports.Paciente = Paciente = __decorate([
    (0, typeorm_1.Entity)()
], Paciente);
//# sourceMappingURL=paciente.entity.js.map