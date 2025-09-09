import { Turno } from './turno.entity';
import { Repository } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { EstadoTurnoService } from '../turnos-estado/estado-turno.service';
export declare class TurnosService {
    private repo;
    private readonly notificaciones;
    private readonly estadoTurno;
    constructor(repo: Repository<Turno>, notificaciones: NotificacionesService, estadoTurno: EstadoTurnoService);
    crear(dto: CreateTurnoDto, veterinaria: Veterinaria): Promise<Turno>;
    listarPorVeterinaria(veterinariaId: string): Promise<Turno[]>;
    cambiarEstado(id: string, estado: any, actorUserId?: string, motivo?: string): Promise<Turno>;
}
