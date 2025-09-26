import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from "typeorm";
import { Especie } from "../especies/especie.entity";

@Entity("raza")
@Index("uq_raza_nombre_especie", ["nombre", "especie"], { unique: true })
export class Raza {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 120 })
  nombre: string;

  @ManyToOne(() => Especie, (e) => e.razas, {
    eager: true,
    onDelete: "CASCADE",
  })
  especie: Especie;
}
