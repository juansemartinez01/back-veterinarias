import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('role')
@Unique(['name'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // 'admin', 'veterinario', 'asistente'

  @Column({ default: false, name: 'is_system' })
  isSystem: boolean;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];
}
