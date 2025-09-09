// src/plantillas/plantillas.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { PlantillasService } from './plantillas.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';

@Controller('plantillas')
@UseGuards(JwtAuthGuard, TenantGuard)
export class PlantillasController {
  constructor(private readonly service: PlantillasService) {}

  @Get()
  list(@CurrentUser() user: any) {
    return this.service.list(user.veterinariaId);
  }

  @Post()
  upsert(@Body() dto: CreatePlantillaDto, @CurrentUser() user: any) {
    return this.service.upsert(user.veterinariaId, dto);
  }
}
