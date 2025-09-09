// src/informes/informes.controller.ts
import { Body, Controller, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { InformesService } from './informes.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { CreateInformeDto } from './dto/create-informe.dto';
import { FinalizarInformeDto } from './dto/finalizar-informe.dto';

@Controller('informes')
@UseGuards(JwtAuthGuard, TenantGuard)
export class InformesController {
  constructor(private readonly service: InformesService) {}

  @Post(':estudioId')
  crear(
    @Param('estudioId') estudioId: string,
    @Body() dto: CreateInformeDto,
    @CurrentUser() user: any,
  ) {
    return this.service.crear(user.veterinariaId, estudioId, user?.id, dto);
  }

  @Get(':informeId')
  detalle(@Param('informeId') informeId: string, @CurrentUser() user: any) {
    return this.service.detalle(informeId, user.veterinariaId);
  }

  @Get('estudio/:estudioId/versiones')
  versiones(@Param('estudioId') estudioId: string, @CurrentUser() user: any) {
    return this.service.versiones(estudioId, user.veterinariaId);
  }

  @Patch(':informeId/finalizar')
  finalizar(
    @Param('informeId') informeId: string,
    @Body() body: FinalizarInformeDto,
    @CurrentUser() user: any,
  ) {
    return this.service.finalizar(informeId, user.veterinariaId, body.confirmar);
  }
}
