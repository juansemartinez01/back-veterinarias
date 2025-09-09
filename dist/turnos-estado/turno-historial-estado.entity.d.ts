import { Turno } from '../turnos/turno.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export type TurnoEstado = 'pendiente' | 'confirmado' | 'atendido' | 'cancelado' | 'no_asistio';
export declare class TurnoHistorialEstado {
    id: string;
    turno: Turno;
    veterinaria: Veterinaria;
    actor?: Usuario | null;
    fromEstado: TurnoEstado;
    toEstado: TurnoEstado;
    motivo?: string | null;
    cambiadoEn: Date;
}
