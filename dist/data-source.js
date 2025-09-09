"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const isSSL = (_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.includes('sslmode=require');
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: isSSL ? { rejectUnauthorized: false } : undefined,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
});
//# sourceMappingURL=data-source.js.map