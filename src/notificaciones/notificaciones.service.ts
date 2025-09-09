// src/notificaciones/notificaciones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { NotificacionProgramada } from './notificacion-programada.entity';
import { Turno } from '../turnos/turno.entity';
import { TenantSettingsService } from '../tenant-settings/tenant-settings.service';
import { PlantillasService } from '../plantillas/plantillas.service';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(NotificacionProgramada) private repo: Repository<NotificacionProgramada>,
    @InjectRepository(Turno) private turnosRepo: Repository<Turno>,
    private readonly settings: TenantSettingsService,
    private readonly plantillas: PlantillasService,
  ) {}

  async programarParaTurno(turnoId: string, veterinariaId: string) {
    const turno = await this.turnosRepo.findOne({
      where: { id: turnoId },
      relations: ['veterinaria', 'cliente', 'paciente'],
    });
    if (!turno) return;

    const conf = await this.settings.getMine(veterinariaId);
    const tz = conf.timezone || 'America/Argentina/Cordoba';
    const hours = conf.reminderHoursBefore ?? 24;

    // turno.fechaHora (sin tz) — interpretarlo en tz del tenant
    const localStart = DateTime.fromJSDate(turno.fechaHora, { zone: tz });
    const scheduledUtc = localStart.minus({ hours }).toUTC().toJSDate();

    const canales: ('email' | 'whatsapp')[] = [];
    if (conf.reminderChannels?.email) canales.push('email');
    if (conf.reminderChannels?.whatsapp) canales.push('whatsapp');

    for (const canal of canales) {
      const exists = await this.repo.findOne({
        where: {
          veterinaria: { id: veterinariaId },
          turno: { id: turnoId },
          canal,
          scheduledAtUtc: scheduledUtc,
        },
      });
      if (!exists) {
        const n = this.repo.create({
          veterinaria: { id: veterinariaId } as any,
          turno: { id: turnoId } as any,
          canal,
          scheduledAtUtc: scheduledUtc,
          estado: 'pendiente',
        });
        await this.repo.save(n);
      }
    }
  }

  async cancelarPendientesDeTurno(turnoId: string, veterinariaId: string) {
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ estado: 'error', lastError: 'cancelado_por_estado' })
      .where('turno_id = :turnoId AND veterinaria_id = :vet AND estado = :st', {
        turnoId,
        vet: veterinariaId,
        st: 'pendiente',
      })
      .execute();
  }

  // Utilidades para el worker
  async loadPlantillaOrDefault(veterinariaId: string, canal: 'email' | 'whatsapp') {
    try {
      return await this.plantillas.get(veterinariaId, 'recordatorio_turno', canal);
    } catch {
      return {
        subject: canal === 'email' ? 'Recordatorio de turno' : undefined,
        body:
          'Hola {{cliente.nombre}}, te recordamos tu turno para {{paciente.nombre}} el {{turno.fecha}} a las {{turno.hora}}. {{veterinaria.nombre}}',
      };
    }
  }
}
