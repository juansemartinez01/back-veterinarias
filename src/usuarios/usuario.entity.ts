import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Veterinaria } from './../veterinarias/veterinaria.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  clave_hash: string;

  @Column({ default: 'veterinario' }) // admin, asistente, etc
  rol: string;

  @ManyToOne(() => Veterinaria, veterinaria => veterinaria.usuarios, { eager: true })
  @JoinColumn({ name: 'veterinaria_id' })
  veterinaria: Veterinaria;
}
