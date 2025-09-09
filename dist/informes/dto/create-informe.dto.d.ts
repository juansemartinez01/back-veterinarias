export declare class MedicionDto {
    nombre: string;
    unidad?: string;
    valor?: string;
    referencia?: string;
}
export declare class SeccionDto {
    orden: number;
    nombre: string;
    texto?: string;
    mediciones: MedicionDto[];
}
export declare class CreateInformeDto {
    cuerpo?: string;
    secciones: SeccionDto[];
}
