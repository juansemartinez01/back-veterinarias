import { IsString, Length, IsUUID } from "class-validator";

export class CreateRazaDto {
  @IsString()
  @Length(1, 120)
  nombre: string;

  @IsUUID()
  especieId: string;
}
