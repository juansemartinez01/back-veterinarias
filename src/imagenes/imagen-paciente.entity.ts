import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

@Entity()
export class ImagenPaciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  filepath: string;

  @CreateDateColumn()
  fechaSubida: Date;

  @ManyToOne(() => Paciente, paciente => paciente.imagenes)
  paciente: Paciente;
}
