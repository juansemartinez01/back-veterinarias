import { Paciente } from './paciente.entity';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class PacientesService {
    private readonly repo;
    constructor(repo: Repository<Paciente>);
    crear(dto: CreatePacienteDto, veterinaria: Veterinaria): Promise<Paciente>;
    listarPorVeterinaria(veterinariaId: string): Promise<Paciente[]>;
    obtenerPorId(id: string, veterinariaId: string): Promise<Paciente>;
}
