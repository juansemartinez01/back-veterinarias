"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantillasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plantilla_mensaje_entity_1 = require("./plantilla-mensaje.entity");
const plantillas_service_1 = require("./plantillas.service");
const plantillas_controller_1 = require("./plantillas.controller");
let PlantillasModule = class PlantillasModule {
};
exports.PlantillasModule = PlantillasModule;
exports.PlantillasModule = PlantillasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plantilla_mensaje_entity_1.PlantillaMensaje])],
        providers: [plantillas_service_1.PlantillasService],
        controllers: [plantillas_controller_1.PlantillasController],
        exports: [plantillas_service_1.PlantillasService],
    })
], PlantillasModule);
//# sourceMappingURL=plantillas.module.js.map