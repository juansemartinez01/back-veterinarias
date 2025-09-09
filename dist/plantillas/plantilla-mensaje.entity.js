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
exports.PlantillaMensaje = void 0;
const typeorm_1 = require("typeorm");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
let PlantillaMensaje = class PlantillaMensaje {
};
exports.PlantillaMensaje = PlantillaMensaje;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlantillaMensaje.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], PlantillaMensaje.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], PlantillaMensaje.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], PlantillaMensaje.prototype, "canal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantillaMensaje.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PlantillaMensaje.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], PlantillaMensaje.prototype, "variables", void 0);
exports.PlantillaMensaje = PlantillaMensaje = __decorate([
    (0, typeorm_1.Entity)('plantilla_mensaje'),
    (0, typeorm_1.Unique)(['veterinaria', 'code', 'canal'])
], PlantillaMensaje);
//# sourceMappingURL=plantilla-mensaje.entity.js.map