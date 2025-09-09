import { Paciente } from '../pacientes/paciente.entity';
import { Consulta } from '../consultas/consulta.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Usuario } from '../usuarios/usuario.entity';
export type EstudioTipo = 'eco_abdomen' | 'eco_torax' | 'rx' | 'control' | 'consulta';
export type EstudioEstado = 'borrador' | 'finalizado' | 'anulado';
export declare class Estudio {
    id: string;
    veterinaria: Veterinaria;
    paciente: Paciente;
    consulta?: Consulta | null;
    veterinario?: Usuario | null;
    tipo: EstudioTipo;
    estado: EstudioEstado;
    notas?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
