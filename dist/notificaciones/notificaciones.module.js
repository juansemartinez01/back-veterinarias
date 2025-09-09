"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notificacion_programada_entity_1 = require("./notificacion-programada.entity");
const notificaciones_service_1 = require("./notificaciones.service");
const notificaciones_worker_1 = require("./notificaciones.worker");
const turno_entity_1 = require("../turnos/turno.entity");
const tenant_settings_module_1 = require("../tenant-settings/tenant-settings.module");
const plantillas_module_1 = require("../plantillas/plantillas.module");
let NotificacionesModule = class NotificacionesModule {
};
exports.NotificacionesModule = NotificacionesModule;
exports.NotificacionesModule = NotificacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([notificacion_programada_entity_1.NotificacionProgramada, turno_entity_1.Turno]),
            tenant_settings_module_1.TenantSettingsModule,
            plantillas_module_1.PlantillasModule,
        ],
        providers: [notificaciones_service_1.NotificacionesService, notificaciones_worker_1.NotificacionesWorker],
        exports: [notificaciones_service_1.NotificacionesService],
    })
], NotificacionesModule);
//# sourceMappingURL=notificaciones.module.js.map