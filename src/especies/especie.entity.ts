import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from "typeorm";
import { Raza } from "../razas/raza.entity";

@Entity("especie")
@Index("uq_especie_nombre", ["nombre"], { unique: true })
export class Especie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 80 })
  nombre: string;

  @OneToMany(() => Raza, (r) => r.especie)
  razas: Raza[];
}
