import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class ClientesService {
    private repo;
    constructor(repo: Repository<Cliente>);
    crear(dto: CreateClienteDto, veterinaria: Veterinaria): Promise<Cliente>;
    listarPorVeterinaria(veterinariaId: string): Promise<Cliente[]>;
}
