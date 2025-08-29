import { Repository } from 'typeorm';
import { Veterinaria } from './veterinaria.entity';
export declare class VeterinariasService {
    private readonly repo;
    constructor(repo: Repository<Veterinaria>);
    crear(nombre: string, cuit: string): Promise<Veterinaria>;
    obtenerTodas(): Promise<Veterinaria[]>;
    obtenerPorId(id: string): Promise<Veterinaria | null>;
}
