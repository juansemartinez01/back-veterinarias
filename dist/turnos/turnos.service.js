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
exports.TurnosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const turno_entity_1 = require("./turno.entity");
const typeorm_2 = require("typeorm");
let TurnosService = class TurnosService {
    constructor(repo) {
        this.repo = repo;
    }
    async crear(dto, veterinaria) {
        const turno = this.repo.create({
            fechaHora: dto.fechaHora,
            cliente: { id: dto.clienteId },
            paciente: { id: dto.pacienteId },
            veterinario: { id: dto.veterinarioId },
            veterinaria,
            estado: 'pendiente',
        });
        return this.repo.save(turno);
    }
    async listarPorVeterinaria(veterinariaId) {
        return this.repo.find({
            where: { veterinaria: { id: veterinariaId } },
            order: { fechaHora: 'ASC' },
        });
    }
    async actualizarEstado(id, estado) {
        const turno = await this.repo.findOneBy({ id });
        if (turno) {
            turno.estado = estado;
            return this.repo.save(turno);
        }
    }
};
exports.TurnosService = TurnosService;
exports.TurnosService = TurnosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(turno_entity_1.Turno)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TurnosService);
//# sourceMappingURL=turnos.service.js.map