import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Paciente } from '../pacientes/paciente.entity';
export declare class Cliente {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    veterinaria: Veterinaria;
    pacientes: Paciente[];
}
