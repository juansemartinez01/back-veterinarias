// src/notificaciones/adapters/whatsapp.adapter.ts
export class WhatsappAdapter {
  async send(input: { to: string; body: string }): Promise<{ id: string }> {
    // Integrá tu proveedor real acá
    // eslint-disable-next-line no-console
    console.log('[WhatsApp] ->', input.to);
    return { id: 'wa-' + Date.now() };
  }
}
