import { VeterinariasService } from './veterinarias.service';
export declare class VeterinariasController {
    private readonly service;
    constructor(service: VeterinariasService);
    crear(body: {
        nombre: string;
        cuit: string;
    }): Promise<import("./veterinaria.entity").Veterinaria>;
    obtenerTodas(): Promise<import("./veterinaria.entity").Veterinaria[]>;
}
