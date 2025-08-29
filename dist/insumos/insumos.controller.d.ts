import { InsumosService } from './insumos.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
export declare class InsumosController {
    private readonly service;
    constructor(service: InsumosService);
    crear(dto: CreateInsumoDto, user: any): Promise<import("./insumo.entity").Insumo>;
    listar(user: any): Promise<import("./insumo.entity").Insumo[]>;
    ajustarStock(id: string, cantidad: string): Promise<import("./insumo.entity").Insumo>;
}
