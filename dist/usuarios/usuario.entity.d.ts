import { Veterinaria } from './../veterinarias/veterinaria.entity';
export declare class Usuario {
    id: string;
    nombre: string;
    email: string;
    clave_hash: string;
    rol: string;
    veterinaria: Veterinaria;
}
