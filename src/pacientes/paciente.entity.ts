import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { Cliente } from "../clientes/cliente.entity";
import { Veterinaria } from "../veterinarias/veterinaria.entity";
import { ImagenPaciente } from "../imagenes/imagen-paciente.entity";
import { Especie } from "../especies/especie.entity";
import { Raza } from "../razas/raza.entity";

export type PacienteSexo = "macho" | "hembra" | "desconocido";

@Entity("paciente")
@Index("ix_paciente_vet_nombre", ["veterinaria", "nombre"])
export class Paciente {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 120, default: "SIN NOMBRE" })
  nombre: string;

  // Relación a catálogo de especies
  @ManyToOne(() => Especie, { eager: true, onDelete: "RESTRICT" })
  especie: Especie;

  // Relación a catálogo de razas (dependiente de especie)
  @ManyToOne(() => Raza, { eager: true, nullable: true, onDelete: "SET NULL" })
  raza?: Raza;

  @Column({ type: "date", nullable: true })
  fechaNacimiento?: Date;

  @Column({ type: "varchar", length: 12, default: "desconocido" })
  sexo: PacienteSexo;

  @Column({ type: "numeric", precision: 6, scale: 2, nullable: true })
  pesoKg?: string | null; // usar string para no perder precisión al serializar

  @Column({ type: "boolean", default: false })
  castrado: boolean;

  // “Snapshot” de datos del dueño en el momento del alta/edición
  @Column({ type: "varchar", length: 160, nullable: true })
  duenoNombre?: string | null;

  @Column({ type: "varchar", length: 40, nullable: true })
  duenoTelefono?: string | null;

  @Column({ type: "varchar", length: 160, nullable: true })
  duenoEmail?: string | null;

  @Column({ type: "varchar", length: 240, nullable: true })
  duenoDireccion?: string | null;

  // Dueño “vivo” (relación)
  @ManyToOne(() => Cliente, (cliente) => cliente.pacientes, {
    eager: true,
    onDelete: "RESTRICT",
  })
  cliente: Cliente;

  // Tenant
  @ManyToOne(() => Veterinaria, { eager: true, onDelete: "RESTRICT" })
  veterinaria: Veterinaria;

  @OneToMany(() => ImagenPaciente, (imagen) => imagen.paciente)
  imagenes: ImagenPaciente[];
}
