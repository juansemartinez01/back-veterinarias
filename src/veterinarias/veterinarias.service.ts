import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veterinaria } from './veterinaria.entity';

@Injectable()
export class VeterinariasService {
  constructor(
    @InjectRepository(Veterinaria)
    private readonly repo: Repository<Veterinaria>,
  ) {}

  async crear(nombre: string, cuit: string): Promise<Veterinaria> {
    const veterinaria = this.repo.create({ nombre, cuit });
    return this.repo.save(veterinaria);
  }

  async obtenerTodas(): Promise<Veterinaria[]> {
    return this.repo.find();
  }

  async obtenerPorId(id: string): Promise<Veterinaria | null> {
    return this.repo.findOne({ where: { id } });
  }
}
