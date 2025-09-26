import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { RazasService } from "./razas.service";
import { CreateRazaDto } from "./dto/create-raza.dto";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { TenantGuard } from "../shared/guards/tenant.guard";

@Controller("razas")
@UseGuards(JwtAuthGuard, TenantGuard)
export class RazasController {
  constructor(private readonly service: RazasService) {}

  @Get()
  listar(@Query("especieId") especieId?: string) {
    return this.service.listar(especieId);
  }

  @Post()
  crear(@Body() dto: CreateRazaDto) {
    return this.service.crear(dto);
  }

  @Delete(":id")
  eliminar(@Param("id") id: string) {
    return this.service.eliminar(id);
  }
}
