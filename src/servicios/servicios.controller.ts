import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/rbac/roles.guard';
import { Roles } from '../auth/rbac/roles.decorator';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Controller('servicios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiciosController {
  constructor(private readonly service: ServiciosService) {}

  @Get()
  async list(@Param() _p: any, req: any) {
    const tenantId = req.user.veterinariaId;
    return this.service.list(tenantId);
  }

  @Get(':id')
  async get(@Param('id') id: string, req: any) {
    const tenantId = req.user.veterinariaId;
    return this.service.get(tenantId, id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() dto: CreateServicioDto, req: any) {
    const tenantId = req.user.veterinariaId;
    return this.service.create(tenantId, dto);
  }

  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateServicioDto, req: any) {
    const tenantId = req.user.veterinariaId;
    return this.service.update(tenantId, id, dto);
  }
}
