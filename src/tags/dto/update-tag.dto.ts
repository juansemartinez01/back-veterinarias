import { IsOptional, IsString, Matches } from "class-validator";

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  name?: string;

  // Hex #RGB o #RRGGBB (opcional). Si querés permitir limpiar color, mandá color: null y manéjalo en el service.
  @IsOptional()
  @IsString()
  @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
    message: "color debe ser hex (#RGB o #RRGGBB)",
  })
  color?: string;
}
