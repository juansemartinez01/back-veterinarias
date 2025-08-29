import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('turnos')
@UseGuards(JwtAuthGuard, TenantGuard)
export class TurnosController {
  constructor(private readonly service: TurnosService) {}

  @Post()
  crear(@Body() dto: CreateTurnoDto, @CurrentUser() user) {
    return this.service.crear(dto, { id: user.veterinariaId } as any);
  }

  @Get()
  listar(@CurrentUser() user) {
    return this.service.listarPorVeterinaria(user.veterinariaId);
  }

  @Patch(':id/:estado')
  actualizarEstado(
    @Param('id') id: string,
    @Param('estado') estado: 'pendiente' | 'atendido' | 'cancelado',
  ) {
    return this.service.actualizarEstado(id, estado);
  }
}
