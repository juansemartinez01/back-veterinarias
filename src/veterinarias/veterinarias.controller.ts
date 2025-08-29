import { Controller, Post, Body, Get } from '@nestjs/common';
import { VeterinariasService } from './veterinarias.service';

@Controller('veterinarias')
export class VeterinariasController {
  constructor(private readonly service: VeterinariasService) {}

  @Post()
  crear(@Body() body: { nombre: string; cuit: string }) {
    return this.service.crear(body.nombre, body.cuit);
  }

  @Get()
  obtenerTodas() {
    return this.service.obtenerTodas();
  }
}
