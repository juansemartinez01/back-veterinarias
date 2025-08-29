import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { TenantGuard } from '../shared/guards/tenant.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private service: UsuariosService) {}

  @Post()
  crear(@Body() dto: CreateUsuarioDto) {
    return this.service.crear(dto);
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  listar(@CurrentUser() user) {
    return this.service.listarPorVeterinaria(user.veterinariaId);
  }
}
