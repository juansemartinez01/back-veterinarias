import { Cliente } from '../clientes/cliente.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Servicio } from '../servicios/servicio.entity';
import { TurnoEstado } from '../turnos-estado/turno-historial-estado.entity';
export declare class Turno {
    id: string;
    fechaHora: Date;
    estado: TurnoEstado;
    cliente: Cliente;
    paciente: Paciente;
    veterinario: Usuario;
    veterinaria: Veterinaria;
    servicio?: Servicio;
    notas?: string;
}
