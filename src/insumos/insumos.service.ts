import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Insumo } from './insumo.entity';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Injectable()
export class InsumosService {
  constructor(
    @InjectRepository(Insumo)
    private repo: Repository<Insumo>,
  ) {}

  async crear(dto: CreateInsumoDto, veterinaria: Veterinaria): Promise<Insumo> {
    const insumo = this.repo.create({ ...dto, veterinaria });
    return this.repo.save(insumo);
  }

  async listarPorVeterinaria(veterinariaId: string): Promise<Insumo[]> {
    return this.repo.find({
      where: { veterinaria: { id: veterinariaId } },
      order: { nombre: 'ASC' },
    });
  }

  async ajustarStock(insumoId: string, cantidad: number): Promise<Insumo> {
    const insumo = await this.repo.findOneBy({ id: insumoId });
    insumo.stock += cantidad;
    return this.repo.save(insumo);
  }
}
