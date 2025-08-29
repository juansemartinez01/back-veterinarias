import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Factura } from './factura.entity';

@Entity()
export class FacturaItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => Factura, factura => factura.items)
  factura: Factura;
}
