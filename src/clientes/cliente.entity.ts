import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Paciente } from '../pacientes/paciente.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  email: string;

  @ManyToOne(() => Veterinaria, { eager: true })
  veterinaria: Veterinaria;

  @OneToMany(() => Paciente, paciente => paciente.cliente)
  pacientes: Paciente[];
}
