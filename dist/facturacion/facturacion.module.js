"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturacionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const factura_entity_1 = require("./factura.entity");
const factura_item_entity_1 = require("./factura-item.entity");
const facturacion_service_1 = require("./facturacion.service");
const facturacion_controller_1 = require("./facturacion.controller");
let FacturacionModule = class FacturacionModule {
};
exports.FacturacionModule = FacturacionModule;
exports.FacturacionModule = FacturacionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([factura_entity_1.Factura, factura_item_entity_1.FacturaItem])],
        providers: [facturacion_service_1.FacturacionService],
        controllers: [facturacion_controller_1.FacturacionController],
    })
], FacturacionModule);
//# sourceMappingURL=facturacion.module.js.map