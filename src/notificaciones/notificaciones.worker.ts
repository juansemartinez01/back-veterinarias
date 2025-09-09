// src/notificaciones/notificaciones.worker.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { NotificacionProgramada } from './notificacion-programada.entity';
import { EmailAdapter } from './adapters/email.adapter';
import { WhatsappAdapter } from './adapters/whatsapp.adapter';

@Injectable()
export class NotificacionesWorker {
  private readonly logger = new Logger(NotificacionesWorker.name);
  private readonly email = new EmailAdapter();
  private readonly wa = new WhatsappAdapter();

  constructor(
    @InjectRepository(NotificacionProgramada)
    private readonly repo: Repository<NotificacionProgramada>,
    private readonly dataSource: DataSource,
  ) {}

  // cada minuto
  @Cron('0 * * * * *')
  async procesarPendientes() {
    const now = new Date();

    // 1) TX corta: tomar lote con lock y marcarlos como "enviando"
    const lote = await this.dataSource.transaction('READ COMMITTED', async (manager) => {
      const q = manager
        .getRepository(NotificacionProgramada)
        .createQueryBuilder('n')
        .leftJoinAndSelect('n.turno', 't')
        .leftJoinAndSelect('t.cliente', 'c')
        .leftJoinAndSelect('t.paciente', 'p')
        .where('n.estado = :st', { st: 'pendiente' })
        .andWhere('n.scheduled_at_utc <= :now', { now })
        .orderBy('n.scheduled_at_utc', 'ASC')
        .take(25)
        .setLock('pessimistic_write') // FOR UPDATE
        .setOnLocked('skip_locked')                // SKIP LOCKED

      const pendientes = await q.getMany();

      if (pendientes.length > 0) {
        // marcamos como enviando + aumenta intentos, todo dentro de la misma TX
        await manager
          .createQueryBuilder()
          .update(NotificacionProgramada)
          .set({
            estado: 'enviando',
            // ojo: ajustá el nombre real de la columna si es intento_count en snake_case
            intentoCount: () => '"intento_count" + 1',
            // opcional: lockedAt: () => 'NOW()',
          })
          .where({ id: In(pendientes.map((n) => n.id)) })
          .execute();
      }

      return pendientes;
    });

    if (lote.length === 0) return;

    // 2) Envío fuera de la transacción
    for (const n of lote) {
      try {
        // Datos del destinatario
        const cliente: any = (n as any)?.turno?.cliente;
        const paciente: any = (n as any)?.turno?.paciente;
        const email = cliente?.email;
        const phone = cliente?.telefono;

        // Fechas de turno
        const fechaTurno = new Date((n as any)?.turno?.fechaHora);
        const fstr = fechaTurno.toLocaleDateString();
        const hstr = fechaTurno.toLocaleTimeString();

        // Render simple
        let subject: string | undefined;
        let body = 'Recordatorio de turno';
        if (n.canal === 'email' || n.canal === 'whatsapp') {
          subject = n.canal === 'email' ? 'Recordatorio de turno' : undefined;
          body = `Hola ${cliente?.nombre ?? ''}, te recordamos el turno de ${paciente?.nombre ?? 'tu mascota'} el ${fstr} a las ${hstr}.`;
        }

        // Envío
        let res: { id: string } = { id: '' };
        if (n.canal === 'email' && email) res = await this.email.send({ to: email, subject, body });
        else if (n.canal === 'whatsapp' && phone) res = await this.wa.send({ to: phone, body });
        else {
          // si no hay destino, marcamos error
          throw new Error('Destino faltante (email/telefono)');
        }

        // 3) Marcar como enviado
        await this.repo.update(n.id, {
          estado: 'enviado',
          providerMessageId: res.id,
          processedAt: new Date(),
        });
      } catch (e: any) {
        this.logger.error(`Error notificación ${n.id}: ${e?.message || e}`);
        await this.repo.update(n.id, {
          estado: 'error',
          lastError: String(e?.message || e),
        });
      }
    }
  }
}
