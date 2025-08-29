import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('clientes')
@UseGuards(JwtAuthGuard, TenantGuard)
export class ClientesController {
  constructor(private readonly service: ClientesService) {}

  @Post()
  crear(@Body() dto: CreateClienteDto, @CurrentUser() user) {
    return this.service.crear(dto, { id: user.veterinariaId } as any);
  }

  @Get()
  listar(@CurrentUser() user) {
    return this.service.listarPorVeterinaria(user.veterinariaId);
  }
}
