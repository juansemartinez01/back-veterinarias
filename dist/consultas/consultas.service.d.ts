import { Consulta } from './consulta.entity';
import { Repository } from 'typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { Usuario } from '../usuarios/usuario.entity';
export declare class ConsultasService {
    private repo;
    constructor(repo: Repository<Consulta>);
    crear(dto: CreateConsultaDto, veterinario: Usuario): Promise<Consulta>;
    listarPorPaciente(pacienteId: string, veterinariaId: string): Promise<Consulta[]>;
}
