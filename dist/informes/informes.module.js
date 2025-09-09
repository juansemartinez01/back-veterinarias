"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const informes_service_1 = require("./informes.service");
const informes_controller_1 = require("./informes.controller");
const informe_entity_1 = require("./informe.entity");
const informe_seccion_entity_1 = require("./informe-seccion.entity");
const medicion_entity_1 = require("./medicion.entity");
const estudio_entity_1 = require("../estudios/estudio.entity");
let InformesModule = class InformesModule {
};
exports.InformesModule = InformesModule;
exports.InformesModule = InformesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([informe_entity_1.Informe, informe_seccion_entity_1.InformeSeccion, medicion_entity_1.Medicion, estudio_entity_1.Estudio])],
        providers: [informes_service_1.InformesService],
        controllers: [informes_controller_1.InformesController],
        exports: [informes_service_1.InformesService],
    })
], InformesModule);
//# sourceMappingURL=informes.module.js.map