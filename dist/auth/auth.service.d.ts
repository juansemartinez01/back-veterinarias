import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class AuthService {
    private usuariosService;
    private jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    login(email: string, clave: string): Promise<{
        access_token: string;
    }>;
}
