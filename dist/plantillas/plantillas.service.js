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
exports.PlantillasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plantilla_mensaje_entity_1 = require("./plantilla-mensaje.entity");
let PlantillasService = class PlantillasService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(veterinariaId) {
        return this.repo.find({ where: { veterinaria: { id: veterinariaId } } });
    }
    async upsert(veterinariaId, dto) {
        let p = await this.repo.findOne({ where: { veterinaria: { id: veterinariaId }, code: dto.code, canal: dto.canal } });
        if (!p) {
            p = this.repo.create(Object.assign(Object.assign({}, dto), { veterinaria: { id: veterinariaId } }));
        }
        else {
            Object.assign(p, dto);
        }
        return this.repo.save(p);
    }
    async get(veterinariaId, code, canal) {
        const p = await this.repo.findOne({ where: { veterinaria: { id: veterinariaId }, code, canal } });
        if (!p)
            throw new common_1.NotFoundException('Plantilla no encontrada');
        return p;
    }
};
exports.PlantillasService = PlantillasService;
exports.PlantillasService = PlantillasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plantilla_mensaje_entity_1.PlantillaMensaje)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlantillasService);
//# sourceMappingURL=plantillas.service.js.map