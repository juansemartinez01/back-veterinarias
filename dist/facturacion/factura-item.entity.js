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
exports.FacturaItem = void 0;
const typeorm_1 = require("typeorm");
const factura_entity_1 = require("./factura.entity");
let FacturaItem = class FacturaItem {
};
exports.FacturaItem = FacturaItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FacturaItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FacturaItem.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], FacturaItem.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], FacturaItem.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => factura_entity_1.Factura, factura => factura.items),
    __metadata("design:type", factura_entity_1.Factura)
], FacturaItem.prototype, "factura", void 0);
exports.FacturaItem = FacturaItem = __decorate([
    (0, typeorm_1.Entity)()
], FacturaItem);
//# sourceMappingURL=factura-item.entity.js.map