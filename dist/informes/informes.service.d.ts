import { Repository } from 'typeorm';
import { Informe } from './informe.entity';
import { Estudio } from '../estudios/estudio.entity';
import { InformeSeccion } from './informe-seccion.entity';
import { Medicion } from './medicion.entity';
import { CreateInformeDto } from './dto/create-informe.dto';
export declare class InformesService {
    private informesRepo;
    private estudiosRepo;
    private seccionesRepo;
    private medicionesRepo;
    constructor(informesRepo: Repository<Informe>, estudiosRepo: Repository<Estudio>, seccionesRepo: Repository<InformeSeccion>, medicionesRepo: Repository<Medicion>);
    private nextVersion;
    crear(tenantId: string, estudioId: string, autorUserId: string | undefined, dto: CreateInformeDto): Promise<{
        secciones: {
            mediciones: any[];
            id: string;
            informe: Informe;
            orden: number;
            nombre: string;
            texto?: string | null;
        }[];
        id: string;
        veterinaria: import("../veterinarias/veterinaria.entity").Veterinaria;
        estudio: Estudio;
        autor?: import("../usuarios/usuario.entity").Usuario | null;
        version: number;
        estado: import("./informe.entity").InformeEstado;
        cuerpo?: string | null;
        extra?: any;
        createdAt: Date;
        updatedAt: Date;
    }>;
    detalle(informeId: string, tenantId: string): Promise<{
        secciones: {
            mediciones: any[];
            id: string;
            informe: Informe;
            orden: number;
            nombre: string;
            texto?: string | null;
        }[];
        id: string;
        veterinaria: import("../veterinarias/veterinaria.entity").Veterinaria;
        estudio: Estudio;
        autor?: import("../usuarios/usuario.entity").Usuario | null;
        version: number;
        estado: import("./informe.entity").InformeEstado;
        cuerpo?: string | null;
        extra?: any;
        createdAt: Date;
        updatedAt: Date;
    }>;
    versiones(estudioId: string, tenantId: string): Promise<Informe[]>;
    finalizar(informeId: string, tenantId: string, confirmar: boolean): Promise<Informe>;
}
