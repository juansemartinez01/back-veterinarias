import { Controller, Post, Body, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('insumos')
@UseGuards(JwtAuthGuard, TenantGuard)
export class InsumosController {
  constructor(private readonly service: InsumosService) {}

  @Post()
  crear(@Body() dto: CreateInsumoDto, @CurrentUser() user) {
    return this.service.crear(dto, { id: user.veterinariaId } as any);
  }

  @Get()
  listar(@CurrentUser() user) {
    return this.service.listarPorVeterinaria(user.veterinariaId);
  }

  @Patch(':id/ajustar/:cantidad')
  ajustarStock(@Param('id') id: string, @Param('cantidad') cantidad: string) {
    return this.service.ajustarStock(id, parseInt(cantidad));
  }
}
