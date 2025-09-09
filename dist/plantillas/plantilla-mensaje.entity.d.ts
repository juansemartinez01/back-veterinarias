import { Veterinaria } from '../veterinarias/veterinaria.entity';
export type Canal = 'email' | 'whatsapp';
export declare class PlantillaMensaje {
    id: string;
    veterinaria: Veterinaria;
    code: string;
    canal: Canal;
    subject?: string;
    body: string;
    variables?: string[];
}
