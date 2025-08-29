import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('pacientes')
@UseGuards(JwtAuthGuard, TenantGuard)
export class PacientesController {
  constructor(private readonly service: PacientesService) {}

  @Post()
  crear(@Body() dto: CreatePacienteDto, @CurrentUser() user) {
    return this.service.crear(dto, { id: user.veterinariaId } as any);
  }

  @Get()
  listar(@CurrentUser() user) {
    return this.service.listarPorVeterinaria(user.veterinariaId);
  }

  @Get(':id')
  obtener(@Param('id') id: string, @CurrentUser() user) {
    return this.service.obtenerPorId(id, user.veterinariaId);
  }
}
