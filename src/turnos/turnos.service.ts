// src/turnos/turnos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { Repository } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { EstadoTurnoService } from '../turnos-estado/estado-turno.service';

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turno)
    private repo: Repository<Turno>,
    private readonly notificaciones: NotificacionesService,
    private readonly estadoTurno: EstadoTurnoService,
  ) {}

  async crear(dto: CreateTurnoDto, veterinaria: Veterinaria): Promise<Turno> {
    const turno = this.repo.create({
      fechaHora: dto.fechaHora as any, // string ISO → Date por TypeORM
      cliente: { id: dto.clienteId } as any,
      paciente: { id: dto.pacienteId } as any,
      veterinario: { id: dto.veterinarioId } as any,
      veterinaria,
      estado: 'pendiente',
    });

    const saved = await this.repo.save(turno);

    // Programar recordatorios según configuraciones del tenant
    await this.notificaciones.programarParaTurno(saved.id, veterinaria.id);

    return saved;
  }

  async listarPorVeterinaria(veterinariaId: string): Promise<Turno[]> {
    return this.repo.find({
      where: { veterinaria: { id: veterinariaId } },
      order: { fechaHora: 'ASC' },
    });
  }

  async cambiarEstado(id: string, estado: any, actorUserId?: string, motivo?: string) {
    return this.estadoTurno.cambiarEstado(id, estado, actorUserId, motivo);
  }
}
