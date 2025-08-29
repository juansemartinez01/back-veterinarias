import { IsString, IsInt, Min } from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  nombre: string;

  @IsString()
  unidad: string;

  @IsInt()
  @Min(0)
  stock: number;
}
