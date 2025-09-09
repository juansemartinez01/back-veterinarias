import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('permission')
@Unique(['code'])
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string; // ej: 'servicios:write', 'turnos:read'

  @Column({ nullable: true })
  description?: string;
}
