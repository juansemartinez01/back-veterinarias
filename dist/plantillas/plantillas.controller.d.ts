import { PlantillasService } from './plantillas.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';
export declare class PlantillasController {
    private readonly service;
    constructor(service: PlantillasService);
    list(user: any): Promise<import("./plantilla-mensaje.entity").PlantillaMensaje[]>;
    upsert(dto: CreatePlantillaDto, user: any): Promise<import("./plantilla-mensaje.entity").PlantillaMensaje>;
}
