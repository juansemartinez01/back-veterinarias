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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
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
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map