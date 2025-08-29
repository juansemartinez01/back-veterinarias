import { IsString } from 'class-validator';

export class CreateConsultaDto {
  @IsString()
  motivo: string;

  @IsString()
  diagnostico: string;

  @IsString()
  tratamiento: string;

  @IsString()
  pacienteId: string;
}
