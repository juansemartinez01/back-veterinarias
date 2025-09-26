import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { EspeciesService } from "./especies.service";
import { CreateEspecieDto } from "./dto/create-especie.dto";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { TenantGuard } from "../shared/guards/tenant.guard";

@Controller("especies")
@UseGuards(JwtAuthGuard, TenantGuard)
export class EspeciesController {
  constructor(private readonly service: EspeciesService) {}

  @Get()
  listar() {
    return this.service.listar();
  }

  @Post()
  crear(@Body() dto: CreateEspecieDto) {
    return this.service.crear(dto);
  }

  @Delete(":id")
  eliminar(@Param("id") id: string) {
    return this.service.eliminar(id);
  }
}
