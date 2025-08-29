import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { ImagenPaciente } from '../imagenes/imagen-paciente.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  especie: string;

  @Column()
  raza: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @ManyToOne(() => Cliente, cliente => cliente.pacientes, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Veterinaria, { eager: true })
  veterinaria: Veterinaria;

  @OneToMany(() => ImagenPaciente, imagen => imagen.paciente)
  imagenes: ImagenPaciente[];
}
