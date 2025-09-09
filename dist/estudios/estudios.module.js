"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudiosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estudio_entity_1 = require("./estudio.entity");
const estudios_service_1 = require("./estudios.service");
const estudios_controller_1 = require("./estudios.controller");
let EstudiosModule = class EstudiosModule {
};
exports.EstudiosModule = EstudiosModule;
exports.EstudiosModule = EstudiosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([estudio_entity_1.Estudio])],
        providers: [estudios_service_1.EstudiosService],
        controllers: [estudios_controller_1.EstudiosController],
        exports: [estudios_service_1.EstudiosService],
    })
], EstudiosModule);
//# sourceMappingURL=estudios.module.js.map