import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { FacturacionService } from './facturacion.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('facturacion')
@UseGuards(JwtAuthGuard, TenantGuard)
export class FacturacionController {
  constructor(private readonly service: FacturacionService) {}

  @Post()
  crear(@Body() dto: CreateFacturaDto, @CurrentUser() user) {
    return this.service.crear(dto, user);
  }

  @Get()
  listar(@CurrentUser() user) {
    return this.service.listarPorVeterinaria(user.veterinariaId);
  }
}
