import { ImagenPaciente } from './imagen-paciente.entity';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { MediaService } from '../media/media.service';
export declare class ImagenesService {
    private repo;
    private readonly media;
    constructor(repo: Repository<ImagenPaciente>, media: MediaService);
    guardarImagen(filename: string, paciente: Paciente, userVeterinariaId: string): Promise<ImagenPaciente>;
    obtenerPorPaciente(paciente: Paciente, userVeterinariaId: string): Promise<ImagenPaciente[]>;
}
