import { FacturacionService } from './facturacion.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
export declare class FacturacionController {
    private readonly service;
    constructor(service: FacturacionService);
    crear(dto: CreateFacturaDto, user: any): Promise<import("./factura.entity").Factura>;
    listar(user: any): Promise<import("./factura.entity").Factura[]>;
}
