import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
export declare class ConsultasController {
    private readonly service;
    constructor(service: ConsultasService);
    crear(dto: CreateConsultaDto, user: any): Promise<import("./consulta.entity").Consulta>;
    listarPorPaciente(pacienteId: string, user: any): Promise<import("./consulta.entity").Consulta[]>;
}
