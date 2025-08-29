import { Cliente } from '../clientes/cliente.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { ImagenPaciente } from '../imagenes/imagen-paciente.entity';
export declare class Paciente {
    id: string;
    nombre: string;
    especie: string;
    raza: string;
    fechaNacimiento: Date;
    cliente: Cliente;
    veterinaria: Veterinaria;
    imagenes: ImagenPaciente[];
}
