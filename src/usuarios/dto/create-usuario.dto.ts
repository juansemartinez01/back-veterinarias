import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  clave: string;

  @IsString()
  veterinariaId: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
