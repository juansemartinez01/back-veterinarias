import { Role } from './role.entity';
import { Usuario } from '../../usuarios/usuario.entity';
export declare class UserRole {
    id: string;
    usuarioId: string;
    usuario: Usuario;
    roleId: string;
    role: Role;
    veterinariaId: string;
}
