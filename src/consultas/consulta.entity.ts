import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  motivo: string;

  @Column({ type: 'text' })
  diagnostico: string;

  @Column({ type: 'text' })
  tratamiento: string;

  @ManyToOne(() => Usuario, { eager: true })
  veterinario: Usuario;

  @ManyToOne(() => Paciente, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Veterinaria)
  veterinaria: Veterinaria;
}
