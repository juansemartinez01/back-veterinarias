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
exports.NotificacionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const luxon_1 = require("luxon");
const typeorm_2 = require("typeorm");
const notificacion_programada_entity_1 = require("./notificacion-programada.entity");
const turno_entity_1 = require("../turnos/turno.entity");
const tenant_settings_service_1 = require("../tenant-settings/tenant-settings.service");
const plantillas_service_1 = require("../plantillas/plantillas.service");
let NotificacionesService = class NotificacionesService {
    constructor(repo, turnosRepo, settings, plantillas) {
        this.repo = repo;
        this.turnosRepo = turnosRepo;
        this.settings = settings;
        this.plantillas = plantillas;
    }
    async programarParaTurno(turnoId, veterinariaId) {
        var _a, _b, _c;
        const turno = await this.turnosRepo.findOne({
            where: { id: turnoId },
            relations: ['veterinaria', 'cliente', 'paciente'],
        });
        if (!turno)
            return;
        const conf = await this.settings.getMine(veterinariaId);
        const tz = conf.timezone || 'America/Argentina/Cordoba';
        const hours = (_a = conf.reminderHoursBefore) !== null && _a !== void 0 ? _a : 24;
        const localStart = luxon_1.DateTime.fromJSDate(turno.fechaHora, { zone: tz });
        const scheduledUtc = localStart.minus({ hours }).toUTC().toJSDate();
        const canales = [];
        if ((_b = conf.reminderChannels) === null || _b === void 0 ? void 0 : _b.email)
            canales.push('email');
        if ((_c = conf.reminderChannels) === null || _c === void 0 ? void 0 : _c.whatsapp)
            canales.push('whatsapp');
        for (const canal of canales) {
            const exists = await this.repo.findOne({
                where: {
                    veterinaria: { id: veterinariaId },
                    turno: { id: turnoId },
                    canal,
                    scheduledAtUtc: scheduledUtc,
                },
            });
            if (!exists) {
                const n = this.repo.create({
                    veterinaria: { id: veterinariaId },
                    turno: { id: turnoId },
                    canal,
                    scheduledAtUtc: scheduledUtc,
                    estado: 'pendiente',
                });
                await this.repo.save(n);
            }
        }
    }
    async cancelarPendientesDeTurno(turnoId, veterinariaId) {
        await this.repo
            .createQueryBuilder()
            .update()
            .set({ estado: 'error', lastError: 'cancelado_por_estado' })
            .where('turno_id = :turnoId AND veterinaria_id = :vet AND estado = :st', {
            turnoId,
            vet: veterinariaId,
            st: 'pendiente',
        })
            .execute();
    }
    async loadPlantillaOrDefault(veterinariaId, canal) {
        try {
            return await this.plantillas.get(veterinariaId, 'recordatorio_turno', canal);
        }
        catch (_a) {
            return {
                subject: canal === 'email' ? 'Recordatorio de turno' : undefined,
                body: 'Hola {{cliente.nombre}}, te recordamos tu turno para {{paciente.nombre}} el {{turno.fecha}} a las {{turno.hora}}. {{veterinaria.nombre}}',
            };
        }
    }
};
exports.NotificacionesService = NotificacionesService;
exports.NotificacionesService = NotificacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notificacion_programada_entity_1.NotificacionProgramada)),
    __param(1, (0, typeorm_1.InjectRepository)(turno_entity_1.Turno)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        tenant_settings_service_1.TenantSettingsService,
        plantillas_service_1.PlantillasService])
], NotificacionesService);
//# sourceMappingURL=notificaciones.service.js.map