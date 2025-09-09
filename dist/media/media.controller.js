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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../shared/guards/jwt-auth.guard");
const tenant_guard_1 = require("../shared/guards/tenant.guard");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
const media_service_1 = require("./media.service");
const s3_service_1 = require("./storage/s3.service");
const tenant_settings_service_1 = require("../tenant-settings/tenant-settings.service");
let MediaController = class MediaController {
    constructor(media, s3, settings) {
        this.media = media;
        this.s3 = s3;
        this.settings = settings;
    }
    async presign(body, user) {
        const conf = await this.settings.getMine(user.veterinariaId);
        const bucket = conf.s3Bucket || process.env.S3_BUCKET;
        const prefix = (conf.s3Prefix || 'uploads') + `/${user.veterinariaId}/${body.scope}/${body.targetId}/`;
        const key = prefix + body.filename;
        const { url } = await this.s3.presignPut({ bucket, key, contentType: body.contentType });
        return { uploadUrl: url, key };
    }
    async register(body, user) {
        var _a, _b, _c, _d, _e, _f;
        const file = await this.media.register({
            veterinariaId: user.veterinariaId,
            uploaderUserId: user.id,
            s3Key: (_a = body.key) !== null && _a !== void 0 ? _a : null,
            mime: (_b = body.mime) !== null && _b !== void 0 ? _b : null,
            sizeBytes: (_c = body.sizeBytes) !== null && _c !== void 0 ? _c : null,
            checksum: (_d = body.checksum) !== null && _d !== void 0 ? _d : null,
            originalName: (_e = body.originalName) !== null && _e !== void 0 ? _e : null,
            legacyPath: (_f = body.legacyPath) !== null && _f !== void 0 ? _f : null,
        });
        await this.media.attach(user.veterinariaId, file.id, body.scope, body.targetId);
        return file;
    }
    async list(scope, targetId, user) {
        return this.media.listByTarget(user.veterinariaId, scope, targetId);
    }
    async presignedGet(id, user) {
        return this.media.getDownloadUrl(user.veterinariaId, id, this.settings, this.s3);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('presign'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "presign", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(':scope/:targetId'),
    __param(0, (0, common_1.Param)('scope')),
    __param(1, (0, common_1.Param)('targetId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('file/:id/url'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "presignedGet", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [media_service_1.MediaService,
        s3_service_1.S3Service,
        tenant_settings_service_1.TenantSettingsService])
], MediaController);
//# sourceMappingURL=media.controller.js.map