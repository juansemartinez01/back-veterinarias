import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
export declare class ServiciosController {
    private readonly service;
    constructor(service: ServiciosService);
    list(_p: any, req: any): Promise<import("./servicio.entity").Servicio[]>;
    get(id: string, req: any): Promise<import("./servicio.entity").Servicio>;
    create(dto: CreateServicioDto, req: any): Promise<import("./servicio.entity").Servicio>;
    update(id: string, dto: UpdateServicioDto, req: any): Promise<import("./servicio.entity").Servicio>;
}
