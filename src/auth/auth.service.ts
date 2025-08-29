import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, clave: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);
    if (!usuario || !(await bcrypt.compare(clave, usuario.clave_hash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.id, veterinariaId: usuario.veterinaria.id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
