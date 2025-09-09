"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentTenant = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentTenant = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    const req = ctx.switchToHttp().getRequest();
    return (_a = req.user) === null || _a === void 0 ? void 0 : _a.veterinariaId;
});
//# sourceMappingURL=current-tenant.decorator.js.map