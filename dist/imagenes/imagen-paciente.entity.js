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
exports.ImagenPaciente = void 0;
const typeorm_1 = require("typeorm");
const paciente_entity_1 = require("../pacientes/paciente.entity");
let ImagenPaciente = class ImagenPaciente {
};
exports.ImagenPaciente = ImagenPaciente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ImagenPaciente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImagenPaciente.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImagenPaciente.prototype, "filepath", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ImagenPaciente.prototype, "fechaSubida", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente, paciente => paciente.imagenes),
    __metadata("design:type", paciente_entity_1.Paciente)
], ImagenPaciente.prototype, "paciente", void 0);
exports.ImagenPaciente = ImagenPaciente = __decorate([
    (0, typeorm_1.Entity)()
], ImagenPaciente);
//# sourceMappingURL=imagen-paciente.entity.js.map