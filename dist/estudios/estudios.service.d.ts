import { Repository } from 'typeorm';
import { Estudio } from './estudio.entity';
import { CreateEstudioDto } from './dto/create-estudio.dto';
export declare class EstudiosService {
    private repo;
    constructor(repo: Repository<Estudio>);
    crear(tenantId: string, dto: CreateEstudioDto): Promise<Estudio>;
    get(id: string, tenantId: string): Promise<Estudio>;
    listarPorPaciente(pacienteId: string, tenantId: string): Promise<Estudio[]>;
}
