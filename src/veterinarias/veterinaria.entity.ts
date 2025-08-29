import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './../usuarios/usuario.entity';

@Entity()
export class Veterinaria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  cuit: string;

  @OneToMany(() => Usuario, usuario => usuario.veterinaria)
  usuarios: Usuario[];
}
