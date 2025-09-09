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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const media_file_entity_1 = require("./media-file.entity");
const media_link_entity_1 = require("./media-link.entity");
let MediaService = class MediaService {
    constructor(files, links) {
        this.files = files;
        this.links = links;
    }
    async register(args) {
        var _a, _b, _c, _d, _e, _f;
        const f = this.files.create({
            veterinaria: { id: args.veterinariaId },
            uploader: args.uploaderUserId ? { id: args.uploaderUserId } : null,
            s3Key: (_a = args.s3Key) !== null && _a !== void 0 ? _a : null,
            mime: (_b = args.mime) !== null && _b !== void 0 ? _b : null,
            sizeBytes: (_c = args.sizeBytes) !== null && _c !== void 0 ? _c : null,
            checksum: (_d = args.checksum) !== null && _d !== void 0 ? _d : null,
            originalName: (_e = args.originalName) !== null && _e !== void 0 ? _e : null,
            legacyPath: (_f = args.legacyPath) !== null && _f !== void 0 ? _f : null,
        });
        return this.files.save(f);
    }
    async attach(veterinariaId, mediaId, scope, targetId) {
        const media = await this.files.findOne({ where: { id: mediaId, veterinaria: { id: veterinariaId } } });
        if (!media)
            throw new common_1.NotFoundException('Media no encontrada');
        const exists = await this.links.findOne({ where: { veterinaria: { id: veterinariaId }, media: { id: mediaId }, scope, targetId } });
        if (exists)
            return exists;
        const link = this.links.create({
            veterinaria: { id: veterinariaId },
            media: { id: mediaId },
            scope,
            targetId,
        });
        return this.links.save(link);
    }
    async listByTarget(veterinariaId, scope, targetId) {
        return this.links.find({
            where: { veterinaria: { id: veterinariaId }, scope, targetId },
            order: { id: 'ASC' },
        });
    }
    async getDownloadUrl(veterinariaId, mediaId, settings, s3) {
        const file = await this.files.findOne({ where: { id: mediaId, veterinaria: { id: veterinariaId } } });
        if (!file)
            throw new common_1.NotFoundException('Media no encontrada');
        if (file.s3Key) {
            const conf = await settings.getMine(veterinariaId);
            const bucket = conf.s3Bucket || process.env.S3_BUCKET;
            const { url } = await s3.presignGet({ bucket, key: file.s3Key, expiresSec: 900 });
            return { type: 's3', url };
        }
        if (file.legacyPath) {
            const base = process.env.UPLOADS_PUBLIC_BASE || '/';
            const normalized = file.legacyPath.startsWith('/') ? file.legacyPath : `/${file.legacyPath}`;
            return { type: 'legacy', url: base.endsWith('/') ? base.slice(0, -1) + normalized : base + normalized };
        }
        throw new common_1.NotFoundException('Media sin ubicación disponible');
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_file_entity_1.MediaFile)),
    __param(1, (0, typeorm_1.InjectRepository)(media_link_entity_1.MediaLink)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MediaService);
//# sourceMappingURL=media.service.js.map