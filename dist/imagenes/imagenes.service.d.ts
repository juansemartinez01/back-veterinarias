import { ImagenPaciente } from './imagen-paciente.entity';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
export declare class ImagenesService {
    private repo;
    constructor(repo: Repository<ImagenPaciente>);
    guardarImagen(filename: string, paciente: Paciente, userVeterinariaId: string): Promise<ImagenPaciente>;
    obtenerPorPaciente(paciente: Paciente, userVeterinariaId: string): Promise<ImagenPaciente[]>;
}
