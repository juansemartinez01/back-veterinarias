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
exports.InformesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const informe_entity_1 = require("./informe.entity");
const estudio_entity_1 = require("../estudios/estudio.entity");
const informe_seccion_entity_1 = require("./informe-seccion.entity");
const medicion_entity_1 = require("./medicion.entity");
let InformesService = class InformesService {
    constructor(informesRepo, estudiosRepo, seccionesRepo, medicionesRepo) {
        this.informesRepo = informesRepo;
        this.estudiosRepo = estudiosRepo;
        this.seccionesRepo = seccionesRepo;
        this.medicionesRepo = medicionesRepo;
    }
    async nextVersion(estudioId, tenantId) {
        const max = await this.informesRepo
            .createQueryBuilder('i')
            .select('COALESCE(MAX(i.version), 0)', 'max')
            .where('i.estudio_id = :estudioId AND i.veterinaria_id = :tenant', { estudioId, tenant: tenantId })
            .getRawOne();
        return (Number(max === null || max === void 0 ? void 0 : max.max) || 0) + 1;
    }
    async crear(tenantId, estudioId, autorUserId, dto) {
        var _a, _b, _c, _d, _e, _f, _g;
        const estudio = await this.estudiosRepo.findOne({ where: { id: estudioId, veterinaria: { id: tenantId } } });
        if (!estudio)
            throw new common_1.NotFoundException('Estudio no encontrado');
        const v = await this.nextVersion(estudioId, tenantId);
        const informe = await this.informesRepo.save(this.informesRepo.create({
            veterinaria: { id: tenantId },
            estudio: { id: estudioId },
            autor: autorUserId ? { id: autorUserId } : null,
            version: v,
            estado: 'borrador',
            cuerpo: (_a = dto.cuerpo) !== null && _a !== void 0 ? _a : null,
        }));
        for (const s of (_b = dto.secciones) !== null && _b !== void 0 ? _b : []) {
            const sec = await this.seccionesRepo.save(this.seccionesRepo.create({
                informe: { id: informe.id },
                orden: s.orden,
                nombre: s.nombre,
                texto: (_c = s.texto) !== null && _c !== void 0 ? _c : null,
            }));
            for (const m of (_d = s.mediciones) !== null && _d !== void 0 ? _d : []) {
                await this.medicionesRepo.save(this.medicionesRepo.create({
                    seccion: { id: sec.id },
                    nombre: m.nombre,
                    unidad: (_e = m.unidad) !== null && _e !== void 0 ? _e : null,
                    valor: (_f = m.valor) !== null && _f !== void 0 ? _f : null,
                    referencia: (_g = m.referencia) !== null && _g !== void 0 ? _g : null,
                }));
            }
        }
        return this.detalle(informe.id, tenantId);
    }
    async detalle(informeId, tenantId) {
        const i = await this.informesRepo.findOne({ where: { id: informeId, veterinaria: { id: tenantId } } });
        if (!i)
            throw new common_1.NotFoundException('Informe no encontrado');
        const secciones = await this.seccionesRepo.find({ where: { informe: { id: i.id } }, order: { orden: 'ASC' } });
        const mapMed = new Map();
        for (const s of secciones) {
            const meds = await this.medicionesRepo.find({ where: { seccion: { id: s.id } }, order: { nombre: 'ASC' } });
            mapMed.set(s.id, meds);
        }
        return Object.assign(Object.assign({}, i), { secciones: secciones.map(s => (Object.assign(Object.assign({}, s), { mediciones: mapMed.get(s.id) || [] }))) });
    }
    async versiones(estudioId, tenantId) {
        return this.informesRepo.find({
            where: { estudio: { id: estudioId }, veterinaria: { id: tenantId } },
            order: { version: 'DESC' },
        });
    }
    async finalizar(informeId, tenantId, confirmar) {
        const i = await this.informesRepo.findOne({ where: { id: informeId, veterinaria: { id: tenantId } } });
        if (!i)
            throw new common_1.NotFoundException('Informe no encontrado');
        if (!confirmar)
            throw new common_1.BadRequestException('Se requiere confirmar=true para finalizar');
        if (i.estado === 'final')
            return i;
        i.estado = 'final';
        return this.informesRepo.save(i);
    }
};
exports.InformesService = InformesService;
exports.InformesService = InformesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(informe_entity_1.Informe)),
    __param(1, (0, typeorm_1.InjectRepository)(estudio_entity_1.Estudio)),
    __param(2, (0, typeorm_1.InjectRepository)(informe_seccion_entity_1.InformeSeccion)),
    __param(3, (0, typeorm_1.InjectRepository)(medicion_entity_1.Medicion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InformesService);
//# sourceMappingURL=informes.service.js.map