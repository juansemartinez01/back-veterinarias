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
exports.TagRel = void 0;
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
const veterinaria_entity_1 = require("../veterinarias/veterinaria.entity");
let TagRel = class TagRel {
};
exports.TagRel = TagRel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TagRel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => veterinaria_entity_1.Veterinaria, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'veterinaria_id' }),
    __metadata("design:type", veterinaria_entity_1.Veterinaria)
], TagRel.prototype, "veterinaria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'tag_id' }),
    __metadata("design:type", tag_entity_1.Tag)
], TagRel.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TagRel.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_id', type: 'uuid' }),
    __metadata("design:type", String)
], TagRel.prototype, "targetId", void 0);
exports.TagRel = TagRel = __decorate([
    (0, typeorm_1.Entity)('tag_rel'),
    (0, typeorm_1.Unique)('uq_tag_rel', ['veterinaria', 'tag', 'scope', 'targetId']),
    (0, typeorm_1.Index)(['veterinaria', 'scope', 'targetId'])
], TagRel);
//# sourceMappingURL=tag-rel.entity.js.map