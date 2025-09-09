"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappAdapter = void 0;
class WhatsappAdapter {
    async send(input) {
        console.log('[WhatsApp] ->', input.to);
        return { id: 'wa-' + Date.now() };
    }
}
exports.WhatsappAdapter = WhatsappAdapter;
//# sourceMappingURL=whatsapp.adapter.js.map