import { EstudiosService } from './estudios.service';
import { CreateEstudioDto } from './dto/create-estudio.dto';
export declare class EstudiosController {
    private readonly service;
    constructor(service: EstudiosService);
    crear(dto: CreateEstudioDto, user: any): Promise<import("./estudio.entity").Estudio>;
    get(id: string, user: any): Promise<import("./estudio.entity").Estudio>;
    listarPorPaciente(pacienteId: string, user: any): Promise<import("./estudio.entity").Estudio[]>;
}
