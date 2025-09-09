import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateServicioDto {
  @IsString() @IsNotEmpty()
  nombre: string;

  @IsString() @IsOptional()
  code?: string;

  @IsInt() @Min(1)
  duracionMin: number;

  @IsString()
  precioBase: string; // numeric como string

  @IsBoolean() @IsOptional()
  activo?: boolean;
}
