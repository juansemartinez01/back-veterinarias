import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagenPaciente } from './imagen-paciente.entity';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(ImagenPaciente)
    private repo: Repository<ImagenPaciente>,
  ) {}

  async guardarImagen(filename: string, paciente: Paciente, userVeterinariaId: string): Promise<ImagenPaciente> {
    if (paciente.veterinaria.id !== userVeterinariaId) {
      throw new ForbiddenException('Acceso denegado');
    }

    const imagen = this.repo.create({
      filename,
      filepath: `uploads/${filename}`,
      paciente,
    });

    return this.repo.save(imagen);
  }

  async obtenerPorPaciente(paciente: Paciente, userVeterinariaId: string): Promise<ImagenPaciente[]> {
    if (paciente.veterinaria.id !== userVeterinariaId) {
      throw new ForbiddenException('Acceso denegado');
    }

    return this.repo.find({
      where: { paciente: { id: paciente.id } },
      order: { fechaSubida: 'DESC' },
    });
  }
}
