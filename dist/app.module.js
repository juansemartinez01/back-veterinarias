"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const auth_module_1 = require("./auth/auth.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const veterinarias_module_1 = require("./veterinarias/veterinarias.module");
const facturacion_module_1 = require("./facturacion/facturacion.module");
const clientes_module_1 = require("./clientes/clientes.module");
const pacientes_module_1 = require("./pacientes/pacientes.module");
const turnos_module_1 = require("./turnos/turnos.module");
const consultas_module_1 = require("./consultas/consultas.module");
const imagenes_module_1 = require("./imagenes/imagenes.module");
const insumos_module_1 = require("./insumos/insumos.module");
const tenant_settings_module_1 = require("./tenant-settings/tenant-settings.module");
const audit_log_module_1 = require("./audit-log/audit-log.module");
const rbac_module_1 = require("./auth/rbac/rbac.module");
const servicios_module_1 = require("./servicios/servicios.module");
const plantillas_module_1 = require("./plantillas/plantillas.module");
const notificaciones_module_1 = require("./notificaciones/notificaciones.module");
const turnos_estado_module_1 = require("./turnos-estado/turnos-estado.module");
const estudios_module_1 = require("./estudios/estudios.module");
const informes_module_1 = require("./informes/informes.module");
const media_module_1 = require("./media/media.module");
const tags_module_1 = require("./tags/tags.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => {
                    var _a;
                    return ({
                        type: 'postgres',
                        url: process.env.DATABASE_URL,
                        autoLoadEntities: true,
                        synchronize: process.env.NODE_ENV !== 'production',
                        ssl: ((_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.includes('sslmode=require'))
                            ? { rejectUnauthorized: false }
                            : undefined,
                    });
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            veterinarias_module_1.VeterinariasModule,
            facturacion_module_1.FacturacionModule,
            clientes_module_1.ClientesModule,
            pacientes_module_1.PacientesModule,
            turnos_module_1.TurnosModule,
            consultas_module_1.ConsultasModule,
            imagenes_module_1.ImagenesModule,
            insumos_module_1.InsumosModule,
            tenant_settings_module_1.TenantSettingsModule,
            audit_log_module_1.AuditLogModule,
            rbac_module_1.RbacModule,
            servicios_module_1.ServiciosModule,
            plantillas_module_1.PlantillasModule,
            notificaciones_module_1.NotificacionesModule,
            turnos_estado_module_1.TurnosEstadoModule,
            estudios_module_1.EstudiosModule,
            informes_module_1.InformesModule,
            media_module_1.MediaModule,
            tags_module_1.TagsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map