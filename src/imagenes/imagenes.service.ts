// src/imagenes/imagenes.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagenPaciente } from './imagen-paciente.entity';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { MediaService } from '../media/media.service'; // <--- NUEVO

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(ImagenPaciente)
    private repo: Repository<ImagenPaciente>,
    private readonly media: MediaService, // <--- NUEVO
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

    const saved = await this.repo.save(imagen);

    // REGISTRO en nuevo modelo (compat)
    const mf = await this.media.register({
      veterinariaId: userVeterinariaId,
      uploaderUserId: undefined,
      s3Key: null,
      mime: null,
      sizeBytes: null,
      checksum: null,
      originalName: filename,
      legacyPath: `uploads/${filename}`,
    });

    await this.media.attach(userVeterinariaId, mf.id, 'paciente', paciente.id);

    return saved;
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
