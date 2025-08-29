import { ImagenesService } from './imagenes.service';
import { PacientesService } from '../pacientes/pacientes.service';
import * as Express from 'express';
export declare class ImagenesController {
    private readonly service;
    private readonly pacientesService;
    constructor(service: ImagenesService, pacientesService: PacientesService);
    subirImagen(pacienteId: string, file: Express.Multer.File, user: any): Promise<import("./imagen-paciente.entity").ImagenPaciente>;
    obtenerPorPaciente(pacienteId: string, user: any): Promise<import("./imagen-paciente.entity").ImagenPaciente[]>;
}
