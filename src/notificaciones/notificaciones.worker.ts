// src/notificaciones/notificaciones.worker.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificacionProgramada } from './notificacion-programada.entity';
import { EmailAdapter } from './adapters/email.adapter';
import { WhatsappAdapter } from './adapters/whatsapp.adapter';

@Injectable()
export class NotificacionesWorker {
  private readonly logger = new Logger(NotificacionesWorker.name);
  private readonly email = new EmailAdapter();
  private readonly wa = new WhatsappAdapter();

  constructor(
    @InjectRepository(NotificacionProgramada) private repo: Repository<NotificacionProgramada>,
  ) {}

  @Cron('*/1 * * * *')
  async procesarPendientes() {
    const now = new Date();
    // Tomar en batch con SKIP LOCKED
    const pend = await this.repo
      .createQueryBuilder('n')
      .setLock('pessimistic_write')
      .where('n.estado = :st', { st: 'pendiente' })
      .andWhere('n.scheduled_at_utc <= :now', { now })
      .orderBy('n.scheduled_at_utc', 'ASC')
      .take(25)
      .getMany();

    for (const n of pend) {
      try {
        await this.repo.update(n.id, { estado: 'enviando', intentoCount: () => 'intento_count + 1' });

        // Destinatarios (simple): usamos cliente del turno
        const cliente = (n.turno as any).cliente;
        const email = cliente?.email;
        const phone = cliente?.telefono;

        // render súper simple (reemplazos básicos)
        const fecha = new Date(n.turno.fechaHora);
        const fstr = fecha.toLocaleDateString();
        const hstr = fecha.toLocaleTimeString();

        let subject: string | undefined;
        let body = 'Recordatorio de turno';

        if (n.canal === 'email' || n.canal === 'whatsapp') {
          // en real: pedir a NotificacionesService la plantilla
          subject = n.canal === 'email' ? 'Recordatorio de turno' : undefined;
          body = `Hola ${cliente?.nombre}, te recordamos tu turno para ${(n.turno as any).paciente?.nombre} el ${fstr} a las ${hstr}.`;
        }

        let res: { id: string } = { id: '' };
        if (n.canal === 'email' && email) res = await this.email.send({ to: email, subject, body });
        if (n.canal === 'whatsapp' && phone) res = await this.wa.send({ to: phone, body });

        await this.repo.update(n.id, { estado: 'enviado', providerMessageId: res.id, processedAt: new Date() });
      } catch (e: any) {
        this.logger.error(e?.message || e);
        await this.repo.update(n.id, { estado: 'error', lastError: String(e?.message || e) });
      }
    }
  }
}
