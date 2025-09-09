import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class Tag {
    id: string;
    veterinaria: Veterinaria;
    name: string;
    color?: string | null;
}
