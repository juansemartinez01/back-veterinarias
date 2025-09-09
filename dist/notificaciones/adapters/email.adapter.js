"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAdapter = void 0;
class EmailAdapter {
    async send(input) {
        console.log('[Email] ->', input.to, input.subject);
        return { id: 'email-' + Date.now() };
    }
}
exports.EmailAdapter = EmailAdapter;
//# sourceMappingURL=email.adapter.js.map