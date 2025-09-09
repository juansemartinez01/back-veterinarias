// src/estudios/dto/create-estudio.dto.ts
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EstudioTipo } from '../estudio.entity';

export class CreateEstudioDto {
  @IsUUID() pacienteId: string;
  @IsUUID() @IsOptional() consultaId?: string;
  @IsUUID() @IsOptional() veterinarioId?: string;

  @IsEnum(['eco_abdomen','eco_torax','rx','control','consulta'] as const) // TS ayuda
  tipo: EstudioTipo;

  @IsString() @IsOptional()
  notas?: string;
}
