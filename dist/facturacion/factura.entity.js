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
exports.Factura = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../clientes/cliente.entity");
const usuario_entity_1 = require("../usuarios/usuario.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
const factura_item_entity_1 = require("./factura-item.entity");
let Factura = class Factura {
};
exports.Factura = Factura;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Factura.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Factura.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Factura.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, { eager: true }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Factura.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { eager: true }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Factura.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], Factura.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => factura_item_entity_1.FacturaItem, item => item.factura, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Factura.prototype, "items", void 0);
exports.Factura = Factura = __decorate([
    (0, typeorm_1.Entity)()
], Factura);
//# sourceMappingURL=factura.entity.js.map