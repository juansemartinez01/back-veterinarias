import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
export declare class PacientesController {
    private readonly service;
    constructor(service: PacientesService);
    crear(dto: CreatePacienteDto, user: any): Promise<import("./paciente.entity").Paciente>;
    listar(user: any): Promise<import("./paciente.entity").Paciente[]>;
    obtener(id: string, user: any): Promise<import("./paciente.entity").Paciente>;
}
