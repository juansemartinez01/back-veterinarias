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
exports.TagsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
const tags_service_1 = require("./tags.service");
let TagsController = class TagsController {
    constructor(service) {
        this.service = service;
    }
    list(user) {
        return this.service.list(user.veterinariaId);
    }
    create(body, user) {
        return this.service.create(user.veterinariaId, body.name, body.color);
    }
    attach(tagId, scope, targetId, user) {
        return this.service.attach(user.veterinariaId, tagId, scope, targetId);
    }
    detach(tagId, scope, targetId, user) {
        return this.service.detach(user.veterinariaId, tagId, scope, targetId);
    }
    listByTarget(scope, targetId, user) {
        return this.service.listByTarget(user.veterinariaId, scope, targetId);
    }
};
exports.TagsController = TagsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':tagId/attach/:scope/:targetId'),
    __param(0, (0, common_1.Param)('tagId')),
    __param(1, (0, common_1.Param)('scope')),
    __param(2, (0, common_1.Param)('targetId')),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "attach", null);
__decorate([
    (0, common_1.Delete)(':tagId/detach/:scope/:targetId'),
    __param(0, (0, common_1.Param)('tagId')),
    __param(1, (0, common_1.Param)('scope')),
    __param(2, (0, common_1.Param)('targetId')),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "detach", null);
__decorate([
    (0, common_1.Get)(':scope/:targetId'),
    __param(0, (0, common_1.Param)('scope')),
    __param(1, (0, common_1.Param)('targetId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "listByTarget", null);
exports.TagsController = TagsController = __decorate([
    (0, common_1.Controller)('tags'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [tags_service_1.TagsService])
], TagsController);
//# sourceMappingURL=tags.controller.js.map