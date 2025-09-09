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
exports.ImagenesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imagen_paciente_entity_1 = require("./imagen-paciente.entity");
const typeorm_2 = require("typeorm");
const media_service_1 = require("../media/media.service");
let ImagenesService = class ImagenesService {
    constructor(repo, media) {
        this.repo = repo;
        this.media = media;
    }
    async guardarImagen(filename, paciente, userVeterinariaId) {
        if (paciente.veterinaria.id !== userVeterinariaId) {
            throw new common_1.ForbiddenException('Acceso denegado');
        }
        const imagen = this.repo.create({
            filename,
            filepath: `uploads/${filename}`,
            paciente,
        });
        const saved = await this.repo.save(imagen);
        const mf = await this.media.register({
            veterinariaId: userVeterinariaId,
            uploaderUserId: undefined,
            s3Key: null,
            mime: null,
            sizeBytes: null,
            checksum: null,
            originalName: filename,
            legacyPath: `uploads/${filename}`,
        });
        await this.media.attach(userVeterinariaId, mf.id, 'paciente', paciente.id);
        return saved;
    }
    async obtenerPorPaciente(paciente, userVeterinariaId) {
        if (paciente.veterinaria.id !== userVeterinariaId) {
            throw new common_1.ForbiddenException('Acceso denegado');
        }
        return this.repo.find({
            where: { paciente: { id: paciente.id } },
            order: { fechaSubida: 'DESC' },
        });
    }
};
exports.ImagenesService = ImagenesService;
exports.ImagenesService = ImagenesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(imagen_paciente_entity_1.ImagenPaciente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        media_service_1.MediaService])
], ImagenesService);
//# sourceMappingURL=imagenes.service.js.map