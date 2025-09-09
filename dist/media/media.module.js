"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const media_file_entity_1 = require("./media-file.entity");
const media_link_entity_1 = require("./media-link.entity");
const media_service_1 = require("./media.service");
const media_controller_1 = require("./media.controller");
const s3_service_1 = require("./storage/s3.service");
const tenant_settings_module_1 = require("../tenant-settings/tenant-settings.module");
let MediaModule = class MediaModule {
};
exports.MediaModule = MediaModule;
exports.MediaModule = MediaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([media_file_entity_1.MediaFile, media_link_entity_1.MediaLink]), tenant_settings_module_1.TenantSettingsModule],
        controllers: [media_controller_1.MediaController],
        providers: [media_service_1.MediaService, s3_service_1.S3Service],
        exports: [media_service_1.MediaService],
    })
], MediaModule);
//# sourceMappingURL=media.module.js.map