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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaFile = void 0;
const typeorm_1 = require("typeorm");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
const usuario_entity_1 = require("../usuarios/usuario.entity");
let MediaFile = class MediaFile {
};
exports.MediaFile = MediaFile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MediaFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], MediaFile.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'SET NULL', eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'uploader_user_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], MediaFile.prototype, "uploader", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 's3_key', nullable: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "s3Key", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime', nullable: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "mime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'size_bytes', type: 'bigint', nullable: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "sizeBytes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'checksum', nullable: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "checksum", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legacy_path', nullable: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "legacyPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_name', nullable: true }),
    __metadata("design:type", String)
], MediaFile.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], MediaFile.prototype, "createdAt", void 0);
exports.MediaFile = MediaFile = __decorate([
    (0, typeorm_1.Entity)('media_file'),
    (0, typeorm_1.Index)(['veterinaria', 'createdAt'])
], MediaFile);
//# sourceMappingURL=media-file.entity.js.map