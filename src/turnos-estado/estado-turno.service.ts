// src/turnos-estado/estado-turno.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from '../turnos/turno.entity';
import { TurnoHistorialEstado, TurnoEstado } from './turno-historial-estado.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

const VALID: Record<TurnoEstado, TurnoEstado[]> = {
  pendiente: ['confirmado', 'cancelado'],
  confirmado: ['pendiente', 'atendido', 'cancelado', 'no_asistio'],
  atendido: [],
  cancelado: [],
  no_asistio: [],
};

@Injectable()
export class EstadoTurnoService {
  constructor(
    @InjectRepository(Turno) private turnosRepo: Repository<Turno>,
    @InjectRepository(TurnoHistorialEstado) private histRepo: Repository<TurnoHistorialEstado>,
    private readonly notif: NotificacionesService,
  ) {}

  async cambiarEstado(turnoId: string, to: TurnoEstado, actorUserId?: string, motivo?: string) {
    const turno = await this.turnosRepo.findOne({
      where: { id: turnoId },
      relations: ['veterinaria'],
    });
    if (!turno) throw new NotFoundException('Turno no encontrado');

    const from = (turno.estado as TurnoEstado) ?? 'pendiente';
    if (!VALID[from].includes(to)) {
      throw new BadRequestException(`Transición inválida: ${from} → ${to}`);
    }

    // guardar historial
    const hist = this.histRepo.create({
      turno,
      veterinaria: turno.veterinaria,
      fromEstado: from,
      toEstado: to,
      actor: actorUserId ? ({ id: actorUserId } as any) : null,
      motivo,
    });
    await this.histRepo.save(hist);

    // actualizar turno
    turno.estado = to;
    await this.turnosRepo.save(turno);

    // si se cancela o se marca atendido/no_asistio → cancelar recordatorios pendientes
    if (to === 'cancelado' || to === 'atendido' || to === 'no_asistio') {
      await this.notif.cancelarPendientesDeTurno(turno.id, turno.veterinaria.id);
    }

    return turno;
  }

  async historial(turnoId: string) {
    return this.histRepo.find({
      where: { turno: { id: turnoId } },
      order: { cambiadoEn: 'ASC' },
    });
  }
}
