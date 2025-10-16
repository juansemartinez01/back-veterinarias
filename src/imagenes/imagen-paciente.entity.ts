// src/imagenes/imagen-paciente.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { Paciente } from "../pacientes/paciente.entity";

@Entity("imagen_paciente")
@Index(["paciente", "fechaSubida"])
export class ImagenPaciente {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 240 })
  filename: string;

  @Column({ length: 512 })
  filepath: string; // p.ej. 'uploads/169999999-123456789.jpg'

  @CreateDateColumn({ type: "timestamptz" })
  fechaSubida: Date;

  @ManyToOne(() => Paciente, (p) => p.imagenes, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "paciente_id" })
  paciente: Paciente;
}
