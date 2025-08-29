import { IsString, IsDateString } from 'class-validator';

export class CreateTurnoDto {
  @IsDateString()
  fechaHora: string;

  @IsString()
  clienteId: string;

  @IsString()
  pacienteId: string;

  @IsString()
  veterinarioId: string;
}
