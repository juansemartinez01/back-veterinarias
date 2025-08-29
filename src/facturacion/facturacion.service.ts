import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './factura.entity';
import { Repository } from 'typeorm';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class FacturacionService {
  constructor(
    @InjectRepository(Factura)
    private repo: Repository<Factura>,
  ) {}

  async crear(dto: CreateFacturaDto, usuario: Usuario): Promise<Factura> {
    const total = dto.items.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0,
    );

    const factura = this.repo.create({
      cliente: { id: dto.clienteId },
      usuario,
      veterinaria: usuario.veterinaria,
      total,
      items: dto.items,
    });

    return this.repo.save(factura);
  }

  async listarPorVeterinaria(veterinariaId: string): Promise<Factura[]> {
    return this.repo.find({
      where: { veterinaria: { id: veterinariaId } },
      order: { fecha: 'DESC' },
    });
  }
}
