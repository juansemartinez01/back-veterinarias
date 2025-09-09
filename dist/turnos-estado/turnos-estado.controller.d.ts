import { EstadoTurnoService } from './estado-turno.service';
export declare class TurnosEstadoController {
    private readonly service;
    constructor(service: EstadoTurnoService);
    cambiar(id: string, body: {
        estado: 'pendiente' | 'confirmado' | 'atendido' | 'cancelado' | 'no_asistio';
        motivo?: string;
    }, user: any): Promise<import("../turnos/turno.entity").Turno>;
    historial(id: string): Promise<import("./turno-historial-estado.entity").TurnoHistorialEstado[]>;
}
