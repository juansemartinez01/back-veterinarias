import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class Insumo {
    id: string;
    nombre: string;
    unidad: string;
    stock: number;
    veterinaria: Veterinaria;
}
