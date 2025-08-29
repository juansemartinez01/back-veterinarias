import { Factura } from './factura.entity';
export declare class FacturaItem {
    id: string;
    descripcion: string;
    precioUnitario: number;
    cantidad: number;
    factura: Factura;
}
