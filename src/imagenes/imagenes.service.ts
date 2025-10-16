// src/imagenes/imagenes.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ImagenPaciente } from "./imagen-paciente.entity";
import { Repository } from "typeorm";
import { Paciente } from "../pacientes/paciente.entity";
import { MediaService } from "../media/media.service";
import * as fs from "fs/promises";
import * as crypto from "crypto";

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(ImagenPaciente) private repo: Repository<ImagenPaciente>,
    private readonly media: MediaService
  ) {}

  async guardarImagen(
    file: { filename: string; path: string; mimetype?: string; size?: number },
    paciente: Paciente,
    userVeterinariaId: string,
    uploaderUserId?: string
  ): Promise<{ imagen: ImagenPaciente; mediaId: string }> {
    if (paciente.veterinaria.id !== userVeterinariaId) {
      throw new ForbiddenException("Acceso denegado");
    }

    // checksum opcional (útil para detectar duplicados)
    let checksum: string | null = null;
    try {
      const buf = await fs.readFile(file.path);
      checksum = crypto.createHash("sha256").update(buf).digest("hex");
    } catch {
      /* ignore si falla */
    }

    const imagen = this.repo.create({
      filename: file.filename,
      filepath: `uploads/${file.filename}`,
      paciente,
    });
    const saved = await this.repo.save(imagen);

    // Registrar en media_file + link a paciente
    const mf = await this.media.register({
      veterinariaId: userVeterinariaId,
      uploaderUserId,
      s3Key: null, // legacy local
      mime: file.mimetype ?? null,
      sizeBytes: file.size?.toString() ?? null,
      checksum,
      originalName: file.filename,
      legacyPath: `uploads/${file.filename}`,
    });
    await this.media.attach(userVeterinariaId, mf.id, "paciente", paciente.id);

    return { imagen: saved, mediaId: mf.id };
  }

  async obtenerPorPaciente(
    paciente: Paciente,
    userVeterinariaId: string
  ): Promise<ImagenPaciente[]> {
    if (paciente.veterinaria.id !== userVeterinariaId) {
      throw new ForbiddenException("Acceso denegado");
    }
    return this.repo.find({
      where: { paciente: { id: paciente.id } },
      order: { fechaSubida: "DESC" },
    });
  }

  async eliminar(id: string, userVeterinariaId: string) {
    const img = await this.repo.findOne({ where: { id } });
    if (!img) throw new NotFoundException("Imagen no encontrada");

    // Cargar paciente para validar tenant
    const paciente =
      img.paciente ||
      (
        await this.repo.findOne({
          where: { id },
          relations: ["paciente", "paciente.veterinaria"],
        })
      )?.paciente;
    if (!paciente || paciente.veterinaria.id !== userVeterinariaId) {
      throw new ForbiddenException("Acceso denegado");
    }

    // Borrar archivo legacy si existe
    const path = img.filepath.startsWith("/")
      ? `.${img.filepath}`
      : `./${img.filepath}`;
    try {
      await fs.unlink(path);
    } catch {
      /* ok si no está */
    }

    await this.repo.remove(img);
    // NOTA: no sabemos qué media_id creó—si querés limpiar media_link/media_file,
    // podés listar los links por target y legacyPath y eliminarlos desde MediaService.
    return { ok: true };
  }
}
