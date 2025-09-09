import { InformesService } from './informes.service';
import { CreateInformeDto } from './dto/create-informe.dto';
import { FinalizarInformeDto } from './dto/finalizar-informe.dto';
export declare class InformesController {
    private readonly service;
    constructor(service: InformesService);
    crear(estudioId: string, dto: CreateInformeDto, user: any): Promise<{
        secciones: {
            mediciones: any[];
            id: string;
            informe: import("./informe.entity").Informe;
            orden: number;
            nombre: string;
            texto?: string | null;
        }[];
        id: string;
        veterinaria: import("../veterinarias/veterinaria.entity").Veterinaria;
        estudio: import("../estudios/estudio.entity").Estudio;
        autor?: import("../usuarios/usuario.entity").Usuario | null;
        version: number;
        estado: import("./informe.entity").InformeEstado;
        cuerpo?: string | null;
        extra?: any;
        createdAt: Date;
        updatedAt: Date;
    }>;
    detalle(informeId: string, user: any): Promise<{
        secciones: {
            mediciones: any[];
            id: string;
            informe: import("./informe.entity").Informe;
            orden: number;
            nombre: string;
            texto?: string | null;
        }[];
        id: string;
        veterinaria: import("../veterinarias/veterinaria.entity").Veterinaria;
        estudio: import("../estudios/estudio.entity").Estudio;
        autor?: import("../usuarios/usuario.entity").Usuario | null;
        version: number;
        estado: import("./informe.entity").InformeEstado;
        cuerpo?: string | null;
        extra?: any;
        createdAt: Date;
        updatedAt: Date;
    }>;
    versiones(estudioId: string, user: any): Promise<import("./informe.entity").Informe[]>;
    finalizar(informeId: string, body: FinalizarInformeDto, user: any): Promise<import("./informe.entity").Informe>;
}
