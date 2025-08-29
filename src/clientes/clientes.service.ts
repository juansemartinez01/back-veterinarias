import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Veterinaria } from '../veterinarias/veterinaria.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private repo: Repository<Cliente>,
  ) {}

  async crear(dto: CreateClienteDto, veterinaria: Veterinaria): Promise<Cliente> {
    const cliente = this.repo.create({
      ...dto,
      veterinaria,
    });
    return this.repo.save(cliente);
  }

  async listarPorVeterinaria(veterinariaId: string): Promise<Cliente[]> {
    return this.repo.find({
      where: { veterinaria: { id: veterinariaId } },
    });
  }
}
