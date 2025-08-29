import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
export declare class ClientesController {
    private readonly service;
    constructor(service: ClientesService);
    crear(dto: CreateClienteDto, user: any): Promise<import("./cliente.entity").Cliente>;
    listar(user: any): Promise<import("./cliente.entity").Cliente[]>;
}
