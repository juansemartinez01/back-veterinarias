import { Estudio } from '../estudios/estudio.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Usuario } from '../usuarios/usuario.entity';
export type InformeEstado = 'borrador' | 'final';
export declare class Informe {
    id: string;
    veterinaria: Veterinaria;
    estudio: Estudio;
    autor?: Usuario | null;
    version: number;
    estado: InformeEstado;
    cuerpo?: string | null;
    extra?: any;
    createdAt: Date;
    updatedAt: Date;
}
