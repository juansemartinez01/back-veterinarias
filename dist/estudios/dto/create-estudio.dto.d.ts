import { EstudioTipo } from '../estudio.entity';
export declare class CreateEstudioDto {
    pacienteId: string;
    consultaId?: string;
    veterinarioId?: string;
    tipo: EstudioTipo;
    notas?: string;
}
