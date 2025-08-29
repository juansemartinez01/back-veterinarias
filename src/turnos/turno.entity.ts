import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ default: 'pendiente' })
  estado: 'pendiente' | 'atendido' | 'cancelado';

  @ManyToOne(() => Cliente, { eager: true })
  cliente: Cliente;

  @ManyToOne(() => Paciente, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Usuario, { eager: true })
  veterinario: Usuario;

  @ManyToOne(() => Veterinaria)
  veterinaria: Veterinaria;
}
