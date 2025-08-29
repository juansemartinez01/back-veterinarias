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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesController = void 0;
const common_1 = require("@nestjs/common");
const imagenes_service_1 = require("./imagenes.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
const pacientes_service_1 = require("../pacientes/pacientes.service");
const Express = require("express");
let ImagenesController = class ImagenesController {
    constructor(service, pacientesService) {
        this.service = service;
        this.pacientesService = pacientesService;
    }
    async subirImagen(pacienteId, file, user) {
        const paciente = await this.pacientesService.obtenerPorId(pacienteId, user.veterinariaId);
        return this.service.guardarImagen(file.filename, paciente, user.veterinariaId);
    }
    async obtenerPorPaciente(pacienteId, user) {
        const paciente = await this.pacientesService.obtenerPorId(pacienteId, user.veterinariaId);
        return this.service.obtenerPorPaciente(paciente, user.veterinariaId);
    }
};
exports.ImagenesController = ImagenesController;
__decorate([
    (0, common_1.Post)('paciente/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${unique}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ImagenesController.prototype, "subirImagen", null);
__decorate([
    (0, common_1.Get)('paciente/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagenesController.prototype, "obtenerPorPaciente", null);
exports.ImagenesController = ImagenesController = __decorate([
    (0, common_1.Controller)('imagenes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [imagenes_service_1.ImagenesService,
        pacientes_service_1.PacientesService])
], ImagenesController);
//# sourceMappingURL=imagenes.controller.js.map