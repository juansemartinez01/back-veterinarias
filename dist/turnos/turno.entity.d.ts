import { Cliente } from '../clientes/cliente.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class Turno {
    id: string;
    fechaHora: Date;
    estado: 'pendiente' | 'atendido' | 'cancelado';
    cliente: Cliente;
    paciente: Paciente;
    veterinario: Usuario;
    veterinaria: Veterinaria;
}
