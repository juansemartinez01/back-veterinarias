import { Usuario } from '../usuarios/usuario.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class Consulta {
    id: string;
    fecha: Date;
    motivo: string;
    diagnostico: string;
    tratamiento: string;
    veterinario: Usuario;
    paciente: Paciente;
    veterinaria: Veterinaria;
}
