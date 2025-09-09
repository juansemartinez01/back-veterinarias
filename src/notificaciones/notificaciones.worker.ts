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

  // corre cada minuto
  @Cron('0 * * * * *')
  async procesarPendientes() {
    const now = new Date();

    // 1) TX corta: tomar SOLO IDs con lock + skip locked (sin joins)
    const ids: string[] = await this.dataSource.transaction('READ COMMITTED', async (manager) => {
      const raws = await manager
        .getRepository(NotificacionProgramada)
        .createQueryBuilder('n')
        .select('n.id', 'id') // <- sólo ID
        .where('n.estado = :st', { st: 'pendiente' })
        .andWhere('n.scheduled_at_utc <= :now', { now })
        .orderBy('n.scheduled_at_utc', 'ASC')
        .limit(25)
        .setLock('pessimistic_write')  // FOR UPDATE
        .setOnLocked('skip_locked')    // SKIP LOCKED
        .getRawMany<{ id: string }>();

      const lote = raws.map(r => r.id);
      if (lote.length === 0) return [];

      // Marcamos como "enviando" y +1 intento dentro de la misma TX
      await manager
        .createQueryBuilder()
        .update(NotificacionProgramada)
        .set({
          estado: 'enviando',
          // ajustá el nombre exacto de la columna si es snake_case
          intentoCount: () => '"intento_count" + 1',
          // lockedAt: () => 'NOW()', // opcional
        })
        .where({ id: In(lote) })
        .execute();

      return lote;
    });

    if (ids.length === 0) return;

    // 2) Fuera de la TX: cargar entidades con relaciones necesarias
    const lote = await this.repo.find({
      where: { id: In(ids) },
      relations: ['turno', 'turno.cliente', 'turno.paciente'],
      order: { scheduledAtUtc: 'ASC' as any }, // opcional para mantener orden
    });

    // 3) Procesar y actualizar estado
    for (const n of lote) {
      try {
        const cliente: any = (n as any)?.turno?.cliente;
        const paciente: any = (n as any)?.turno?.paciente;
        const email = cliente?.email;
        const phone = cliente?.telefono;

        const fechaTurno = new Date((n as any)?.turno?.fechaHora);
        const fstr = fechaTurno.toLocaleDateString();
        const hstr = fechaTurno.toLocaleTimeString();

        let subject: string | undefined;
        let body = 'Recordatorio de turno';
        if (n.canal === 'email' || n.canal === 'whatsapp') {
          subject = n.canal === 'email' ? 'Recordatorio de turno' : undefined;
          body = `Hola ${cliente?.nombre ?? ''}, te recordamos el turno de ${paciente?.nombre ?? 'tu mascota'} el ${fstr} a las ${hstr}.`;
        }

        let res: { id: string } = { id: '' };
        if (n.canal === 'email' && email) {
          res = await this.email.send({ to: email, subject, body });
        } else if (n.canal === 'whatsapp' && phone) {
          res = await this.wa.send({ to: phone, body });
        } else {
          throw new Error('Destino faltante (email/telefono)');
        }

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
