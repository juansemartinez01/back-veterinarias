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
var NotificacionesWorker_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionesWorker = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notificacion_programada_entity_1 = require("./notificacion-programada.entity");
const email_adapter_1 = require("./adapters/email.adapter");
const whatsapp_adapter_1 = require("./adapters/whatsapp.adapter");
let NotificacionesWorker = NotificacionesWorker_1 = class NotificacionesWorker {
    constructor(repo) {
        this.repo = repo;
        this.logger = new common_1.Logger(NotificacionesWorker_1.name);
        this.email = new email_adapter_1.EmailAdapter();
        this.wa = new whatsapp_adapter_1.WhatsappAdapter();
    }
    async procesarPendientes() {
        var _a;
        const now = new Date();
        const pend = await this.repo
            .createQueryBuilder('n')
            .setLock('pessimistic_write')
            .where('n.estado = :st', { st: 'pendiente' })
            .andWhere('n.scheduled_at_utc <= :now', { now })
            .orderBy('n.scheduled_at_utc', 'ASC')
            .take(25)
            .getMany();
        for (const n of pend) {
            try {
                await this.repo.update(n.id, { estado: 'enviando', intentoCount: () => 'intento_count + 1' });
                const cliente = n.turno.cliente;
                const email = cliente === null || cliente === void 0 ? void 0 : cliente.email;
                const phone = cliente === null || cliente === void 0 ? void 0 : cliente.telefono;
                const fecha = new Date(n.turno.fechaHora);
                const fstr = fecha.toLocaleDateString();
                const hstr = fecha.toLocaleTimeString();
                let subject;
                let body = 'Recordatorio de turno';
                if (n.canal === 'email' || n.canal === 'whatsapp') {
                    subject = n.canal === 'email' ? 'Recordatorio de turno' : undefined;
                    body = `Hola ${cliente === null || cliente === void 0 ? void 0 : cliente.nombre}, te recordamos tu turno para ${(_a = n.turno.paciente) === null || _a === void 0 ? void 0 : _a.nombre} el ${fstr} a las ${hstr}.`;
                }
                let res = { id: '' };
                if (n.canal === 'email' && email)
                    res = await this.email.send({ to: email, subject, body });
                if (n.canal === 'whatsapp' && phone)
                    res = await this.wa.send({ to: phone, body });
                await this.repo.update(n.id, { estado: 'enviado', providerMessageId: res.id, processedAt: new Date() });
            }
            catch (e) {
                this.logger.error((e === null || e === void 0 ? void 0 : e.message) || e);
                await this.repo.update(n.id, { estado: 'error', lastError: String((e === null || e === void 0 ? void 0 : e.message) || e) });
            }
        }
    }
};
exports.NotificacionesWorker = NotificacionesWorker;
__decorate([
    (0, schedule_1.Cron)('*/1 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificacionesWorker.prototype, "procesarPendientes", null);
exports.NotificacionesWorker = NotificacionesWorker = NotificacionesWorker_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notificacion_programada_entity_1.NotificacionProgramada)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificacionesWorker);
//# sourceMappingURL=notificaciones.worker.js.map