"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Service = class S3Service {
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: process.env.AWS_ACCESS_KEY_ID
                ? {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                }
                : undefined,
        });
    }
    async presignPut(params) {
        var _a;
        const cmd = new client_s3_1.PutObjectCommand({
            Bucket: params.bucket,
            Key: params.key,
            ContentType: params.contentType,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, cmd, { expiresIn: (_a = params.expiresSec) !== null && _a !== void 0 ? _a : 900 });
        return { url, key: params.key };
    }
    async presignGet(params) {
        var _a;
        const cmd = new client_s3_1.GetObjectCommand({
            Bucket: params.bucket,
            Key: params.key,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, cmd, { expiresIn: (_a = params.expiresSec) !== null && _a !== void 0 ? _a : 900 });
        return { url };
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
//# sourceMappingURL=s3.service.js.map