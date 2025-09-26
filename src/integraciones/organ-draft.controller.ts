import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { TenantGuard } from "../shared/guards/tenant.guard";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { OrganDraftInputDto, OrganDraftOutputDto } from "./dto/organ-draft.dto";
import { OrganDraftService } from "./organ-draft.service";

@Controller("integraciones")
@UseGuards(JwtAuthGuard, TenantGuard)
export class OrganDraftController {
  constructor(private readonly service: OrganDraftService) {}

  /**
   * Reenvía el payload al sistema externo y devuelve su respuesta
   */
  @Post("organ-draft")
  generar(
    @Body() dto: OrganDraftInputDto,
    @CurrentUser() user: any
  ): Promise<OrganDraftOutputDto> {
    return this.service.generar(dto, {
      veterinariaId: user.veterinariaId,
      userId: user.id,
    });
  }
}
