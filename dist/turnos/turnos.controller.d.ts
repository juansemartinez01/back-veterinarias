import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
export declare class TurnosController {
    private readonly service;
    constructor(service: TurnosService);
    crear(dto: CreateTurnoDto, user: any): Promise<import("./turno.entity").Turno>;
    listar(user: any): Promise<import("./turno.entity").Turno[]>;
    actualizarEstado(id: string, estado: 'pendiente' | 'atendido' | 'cancelado'): Promise<import("./turno.entity").Turno>;
}
