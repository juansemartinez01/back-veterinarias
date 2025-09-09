import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Servicio } from '../servicios/servicio.entity';
import { TurnoEstado } from '../turnos-estado/turno-historial-estado.entity';


  


@Entity('turno')
@Index(['veterinaria'])
export class Turno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', name: 'fecha_hora' })
  fechaHora: Date;

  @Column({ default: 'pendiente' })
  estado: TurnoEstado;

  @ManyToOne(() => Cliente, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Paciente, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;


  @ManyToOne(() => Usuario, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'veterinario_id' })
  veterinario: Usuario;

  @ManyToOne(() => Veterinaria, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;

  @ManyToOne(() => Servicio, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'servicio_id' })
  servicio?: Servicio;

  @Column({ type: 'text', nullable: true })
  notas?: string;
}
