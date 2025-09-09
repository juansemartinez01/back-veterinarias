import { InformeSeccion } from './informe-seccion.entity';
export declare class Medicion {
    id: string;
    seccion: InformeSeccion;
    nombre: string;
    unidad?: string | null;
    valor?: string | null;
    referencia?: string | null;
}
