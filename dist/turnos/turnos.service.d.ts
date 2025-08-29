import { Turno } from './turno.entity';
import { Repository } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class TurnosService {
    private repo;
    constructor(repo: Repository<Turno>);
    crear(dto: CreateTurnoDto, veterinaria: Veterinaria): Promise<Turno>;
    listarPorVeterinaria(veterinariaId: string): Promise<Turno[]>;
    actualizarEstado(id: string, estado: 'pendiente' | 'atendido' | 'cancelado'): Promise<Turno>;
}
