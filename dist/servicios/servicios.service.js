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
exports.ServiciosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const servicio_entity_1 = require("./servicio.entity");
let ServiciosService = class ServiciosService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(tenantId) {
        return this.repo.find({ where: { veterinariaId: tenantId, activo: true } });
    }
    async get(tenantId, id) {
        const s = await this.repo.findOne({ where: { id, veterinariaId: tenantId } });
        if (!s)
            throw new common_1.NotFoundException('Servicio no encontrado');
        return s;
    }
    async create(tenantId, dto) {
        if (dto.code) {
            const dup = await this.repo.findOne({ where: { veterinariaId: tenantId, code: dto.code } });
            if (dup)
                throw new common_1.ConflictException('code duplicado en este tenant');
        }
        const s = this.repo.create(Object.assign(Object.assign({}, dto), { veterinariaId: tenantId }));
        return this.repo.save(s);
    }
    async update(tenantId, id, dto) {
        const s = await this.get(tenantId, id);
        if (dto.code && dto.code !== s.code) {
            const dup = await this.repo.findOne({ where: { veterinariaId: tenantId, code: dto.code } });
            if (dup)
                throw new common_1.ConflictException('code duplicado en este tenant');
        }
        Object.assign(s, dto);
        return this.repo.save(s);
    }
    async remove(tenantId, id) {
        const s = await this.get(tenantId, id);
        s.activo = false;
        return this.repo.save(s);
    }
};
exports.ServiciosService = ServiciosService;
exports.ServiciosService = ServiciosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(servicio_entity_1.Servicio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiciosService);
//# sourceMappingURL=servicios.service.js.map