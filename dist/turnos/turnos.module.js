"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const turno_entity_1 = require("./turno.entity");
const turnos_service_1 = require("./turnos.service");
const turnos_controller_1 = require("./turnos.controller");
let TurnosModule = class TurnosModule {
};
exports.TurnosModule = TurnosModule;
exports.TurnosModule = TurnosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([turno_entity_1.Turno])],
        providers: [turnos_service_1.TurnosService],
        controllers: [turnos_controller_1.TurnosController],
    })
], TurnosModule);
//# sourceMappingURL=turnos.module.js.map