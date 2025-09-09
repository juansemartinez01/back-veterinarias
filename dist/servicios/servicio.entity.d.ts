import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class Servicio {
    id: string;
    veterinariaId: string;
    veterinaria: Veterinaria;
    nombre: string;
    code: string;
    duracionMin: number;
    precioBase: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
