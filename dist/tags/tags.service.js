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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
const tag_rel_entity_1 = require("./tag-rel.entity");
let TagsService = class TagsService {
    constructor(tags, rels) {
        this.tags = tags;
        this.rels = rels;
    }
    async create(veterinariaId, name, color) {
        const exists = await this.tags.findOne({ where: { veterinaria: { id: veterinariaId }, name } });
        if (exists)
            throw new common_1.ConflictException('Tag duplicado');
        return this.tags.save(this.tags.create({ veterinaria: { id: veterinariaId }, name, color: color !== null && color !== void 0 ? color : null }));
    }
    list(veterinariaId) {
        return this.tags.find({ where: { veterinaria: { id: veterinariaId } }, order: { name: 'ASC' } });
    }
    async attach(veterinariaId, tagId, scope, targetId) {
        const tag = await this.tags.findOne({ where: { id: tagId, veterinaria: { id: veterinariaId } } });
        if (!tag)
            throw new common_1.NotFoundException('Tag no encontrado');
        const exists = await this.rels.findOne({ where: { veterinaria: { id: veterinariaId }, tag: { id: tagId }, scope, targetId } });
        if (exists)
            return exists;
        return this.rels.save(this.rels.create({ veterinaria: { id: veterinariaId }, tag: { id: tagId }, scope, targetId }));
    }
    async detach(veterinariaId, tagId, scope, targetId) {
        await this.rels.delete({ veterinaria: { id: veterinariaId }, tag: { id: tagId }, scope, targetId });
        return { ok: true };
    }
    listByTarget(veterinariaId, scope, targetId) {
        return this.rels.find({ where: { veterinaria: { id: veterinariaId }, scope, targetId } });
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_rel_entity_1.TagRel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TagsService);
//# sourceMappingURL=tags.service.js.map