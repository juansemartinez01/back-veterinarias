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
exports.MediaLink = void 0;
const typeorm_1 = require("typeorm");
const media_file_entity_1 = require("./media-file.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
let MediaLink = class MediaLink {
};
exports.MediaLink = MediaLink;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MediaLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], MediaLink.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => media_file_entity_1.MediaFile, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'media_id' }),
    __metadata("design:type", media_file_entity_1.MediaFile)
], MediaLink.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], MediaLink.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_id', type: 'uuid' }),
    __metadata("design:type", String)
], MediaLink.prototype, "targetId", void 0);
exports.MediaLink = MediaLink = __decorate([
    (0, typeorm_1.Entity)('media_link'),
    (0, typeorm_1.Unique)('uq_media_link', ['veterinaria', 'media', 'scope', 'targetId']),
    (0, typeorm_1.Index)(['veterinaria', 'scope', 'targetId'])
], MediaLink);
//# sourceMappingURL=media-link.entity.js.map