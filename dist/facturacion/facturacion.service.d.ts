import { Factura } from './factura.entity';
import { Repository } from 'typeorm';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { Usuario } from '../usuarios/usuario.entity';
export declare class FacturacionService {
    private repo;
    constructor(repo: Repository<Factura>);
    crear(dto: CreateFacturaDto, usuario: Usuario): Promise<Factura>;
    listarPorVeterinaria(veterinariaId: string): Promise<Factura[]>;
}
