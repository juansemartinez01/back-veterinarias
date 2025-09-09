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
exports.EstadoTurnoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const turno_entity_1 = require("../turnos/turno.entity");
const turno_historial_estado_entity_1 = require("./turno-historial-estado.entity");
const notificaciones_service_1 = require("../notificaciones/notificaciones.service");
const VALID = {
    pendiente: ['confirmado', 'cancelado'],
    confirmado: ['pendiente', 'atendido', 'cancelado', 'no_asistio'],
    atendido: [],
    cancelado: [],
    no_asistio: [],
};
let EstadoTurnoService = class EstadoTurnoService {
    constructor(turnosRepo, histRepo, notif) {
        this.turnosRepo = turnosRepo;
        this.histRepo = histRepo;
        this.notif = notif;
    }
    async cambiarEstado(turnoId, to, actorUserId, motivo) {
        var _a;
        const turno = await this.turnosRepo.findOne({
            where: { id: turnoId },
            relations: ['veterinaria'],
        });
        if (!turno)
            throw new common_1.NotFoundException('Turno no encontrado');
        const from = (_a = turno.estado) !== null && _a !== void 0 ? _a : 'pendiente';
        if (!VALID[from].includes(to)) {
            throw new common_1.BadRequestException(`Transición inválida: ${from} → ${to}`);
        }
        const hist = this.histRepo.create({
            turno,
            veterinaria: turno.veterinaria,
            fromEstado: from,
            toEstado: to,
            actor: actorUserId ? { id: actorUserId } : null,
            motivo,
        });
        await this.histRepo.save(hist);
        turno.estado = to;
        await this.turnosRepo.save(turno);
        if (to === 'cancelado' || to === 'atendido' || to === 'no_asistio') {
            await this.notif.cancelarPendientesDeTurno(turno.id, turno.veterinaria.id);
        }
        return turno;
    }
    async historial(turnoId) {
        return this.histRepo.find({
            where: { turno: { id: turnoId } },
            order: { cambiadoEn: 'ASC' },
        });
    }
};
exports.EstadoTurnoService = EstadoTurnoService;
exports.EstadoTurnoService = EstadoTurnoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(turno_entity_1.Turno)),
    __param(1, (0, typeorm_1.InjectRepository)(turno_historial_estado_entity_1.TurnoHistorialEstado)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notificaciones_service_1.NotificacionesService])
], EstadoTurnoService);
//# sourceMappingURL=estado-turno.service.js.map