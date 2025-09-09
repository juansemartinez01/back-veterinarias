import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Turno } from '../turnos/turno.entity';
export type NotiEstado = 'pendiente' | 'enviando' | 'enviado' | 'error';
export type Canal = 'email' | 'whatsapp';
export declare class NotificacionProgramada {
    id: string;
    veterinaria: Veterinaria;
    turno: Turno;
    canal: Canal;
    scheduledAtUtc: Date;
    estado: NotiEstado;
    intentoCount: number;
    lastError?: string | null;
    providerMessageId?: string | null;
    creadoEn: Date;
    processedAt?: Date | null;
}
