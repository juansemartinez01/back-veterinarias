import { IsString, Length } from "class-validator";

export class CreateEspecieDto {
  @IsString()
  @Length(1, 80)
  nombre: string;
}
