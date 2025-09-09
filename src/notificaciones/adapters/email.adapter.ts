// src/notificaciones/adapters/email.adapter.ts
export class EmailAdapter {
  async send(input: { to: string; subject?: string; body: string }): Promise<{ id: string }> {
    // Integrá tu proveedor real acá
    // eslint-disable-next-line no-console
    console.log('[Email] ->', input.to, input.subject);
    return { id: 'email-' + Date.now() };
  }
}
