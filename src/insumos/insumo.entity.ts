import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Entity()
export class Insumo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  unidad: string; // Ej: "ml", "unidades", "dosis"

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => Veterinaria, { eager: true })
  veterinaria: Veterinaria;
}
