import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { FacturaItem } from './factura-item.entity';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @ManyToOne(() => Veterinaria)
  veterinaria: Veterinaria;

  @OneToMany(() => FacturaItem, item => item.factura, { cascade: true, eager: true })
  items: FacturaItem[];
}
