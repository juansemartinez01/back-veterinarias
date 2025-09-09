import { Repository } from 'typeorm';
import { Turno } from '../turnos/turno.entity';
import { TurnoHistorialEstado, TurnoEstado } from './turno-historial-estado.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
export declare class EstadoTurnoService {
    private turnosRepo;
    private histRepo;
    private readonly notif;
    constructor(turnosRepo: Repository<Turno>, histRepo: Repository<TurnoHistorialEstado>, notif: NotificacionesService);
    cambiarEstado(turnoId: string, to: TurnoEstado, actorUserId?: string, motivo?: string): Promise<Turno>;
    historial(turnoId: string): Promise<TurnoHistorialEstado[]>;
}
