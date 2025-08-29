import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
