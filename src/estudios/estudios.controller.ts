// src/estudios/estudios.controller.ts
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EstudiosService } from './estudios.service';
import { CreateEstudioDto } from './dto/create-estudio.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('estudios')
@UseGuards(JwtAuthGuard, TenantGuard)
export class EstudiosController {
  constructor(private readonly service: EstudiosService) {}

  @Post()
  crear(@Body() dto: CreateEstudioDto, @CurrentUser() user: any) {
    return this.service.crear(user.veterinariaId, dto);
  }

  @Get(':id')
  get(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.get(id, user.veterinariaId);
  }

  @Get('paciente/:pacienteId')
  listarPorPaciente(@Param('pacienteId') pacienteId: string, @CurrentUser() user: any) {
    return this.service.listarPorPaciente(pacienteId, user.veterinariaId);
  }
}
