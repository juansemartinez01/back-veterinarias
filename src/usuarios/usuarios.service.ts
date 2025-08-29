import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private repo: Repository<Usuario>) {}

  async crear(dto: CreateUsuarioDto): Promise<Usuario> {
  const clave_hash = await bcrypt.hash(dto.clave, 10);

  const usuario = this.repo.create({
    nombre: dto.nombre,
    email: dto.email,
    clave_hash,
    rol: dto.rol ?? 'veterinario',
    veterinaria: { id: dto.veterinariaId } as Veterinaria,
  });

  return this.repo.save(usuario);
}


  // usuarios.service.ts
async buscarPorEmail(email: string) {
  return this.repo.findOne({
    where: { email },
    relations: { veterinaria: true }, // <— IMPORTANTE
    // select opcional si querés limitar columnas
  });
}


  async listarPorVeterinaria(veterinariaId: string) {
    return this.repo.find({ where: { veterinaria: { id: veterinariaId } } });
  }
}
