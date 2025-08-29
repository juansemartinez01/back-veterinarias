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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturacionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const factura_entity_1 = require("./factura.entity");
const typeorm_2 = require("typeorm");
let FacturacionService = class FacturacionService {
    constructor(repo) {
        this.repo = repo;
    }
    async crear(dto, usuario) {
        const total = dto.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
        const factura = this.repo.create({
            cliente: { id: dto.clienteId },
            usuario,
            veterinaria: usuario.veterinaria,
            total,
            items: dto.items,
        });
        return this.repo.save(factura);
    }
    async listarPorVeterinaria(veterinariaId) {
        return this.repo.find({
            where: { veterinaria: { id: veterinariaId } },
            order: { fecha: 'DESC' },
        });
    }
};
exports.FacturacionService = FacturacionService;
exports.FacturacionService = FacturacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(factura_entity_1.Factura)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FacturacionService);
//# sourceMappingURL=facturacion.service.js.map