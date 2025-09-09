// src/turnos-estado/turnos-estado.controller.ts
import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { EstadoTurnoService } from './estado-turno.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('turnos')
@UseGuards(JwtAuthGuard, TenantGuard)
export class TurnosEstadoController {
  constructor(private readonly service: EstadoTurnoService) {}

  @Patch(':id/estado')
  async cambiar(
    @Param('id') id: string,
    @Body() body: { estado: 'pendiente' | 'confirmado' | 'atendido' | 'cancelado' | 'no_asistio'; motivo?: string },
    @CurrentUser() user: any,
  ) {
    return this.service.cambiarEstado(id, body.estado, user?.id, body?.motivo);
  }

  @Get(':id/historial-estado')
  async historial(@Param('id') id: string) {
    return this.service.historial(id);
  }
}
