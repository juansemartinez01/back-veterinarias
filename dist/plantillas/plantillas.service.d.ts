import { Repository } from 'typeorm';
import { PlantillaMensaje } from './plantilla-mensaje.entity';
export declare class PlantillasService {
    private repo;
    constructor(repo: Repository<PlantillaMensaje>);
    list(veterinariaId: string): Promise<PlantillaMensaje[]>;
    upsert(veterinariaId: string, dto: Partial<PlantillaMensaje>): Promise<PlantillaMensaje>;
    get(veterinariaId: string, code: string, canal: 'email' | 'whatsapp'): Promise<PlantillaMensaje>;
}
