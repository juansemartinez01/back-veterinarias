// src/informes/dto/finalizar-informe.dto.ts
import { IsBoolean } from 'class-validator';
export class FinalizarInformeDto {
  @IsBoolean()
  confirmar: boolean;
}
