import { Repository } from 'typeorm';
import { Insumo } from './insumo.entity';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
export declare class InsumosService {
    private repo;
    constructor(repo: Repository<Insumo>);
    crear(dto: CreateInsumoDto, veterinaria: Veterinaria): Promise<Insumo>;
    listarPorVeterinaria(veterinariaId: string): Promise<Insumo[]>;
    ajustarStock(insumoId: string, cantidad: number): Promise<Insumo>;
}
