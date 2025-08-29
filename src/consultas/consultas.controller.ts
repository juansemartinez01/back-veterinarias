import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('consultas')
@UseGuards(JwtAuthGuard, TenantGuard)
export class ConsultasController {
  constructor(private readonly service: ConsultasService) {}

  @Post()
  crear(@Body() dto: CreateConsultaDto, @CurrentUser() user) {
    return this.service.crear(dto, user);
  }

  @Get('paciente/:id')
  listarPorPaciente(@Param('id') pacienteId: string, @CurrentUser() user) {
    return this.service.listarPorPaciente(pacienteId, user.veterinariaId);
  }
}
