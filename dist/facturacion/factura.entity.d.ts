import { Cliente } from '../clientes/cliente.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { FacturaItem } from './factura-item.entity';
export declare class Factura {
    id: string;
    fecha: Date;
    total: number;
    cliente: Cliente;
    usuario: Usuario;
    veterinaria: Veterinaria;
    items: FacturaItem[];
}
