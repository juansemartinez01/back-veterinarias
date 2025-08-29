import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  nombre: string;

  @IsString()
  especie: string;

  @IsString()
  raza: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsString()
  clienteId: string;
}
