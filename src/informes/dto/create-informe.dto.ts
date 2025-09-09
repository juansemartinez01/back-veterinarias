// src/informes/dto/create-informe.dto.ts
import { IsArray, IsOptional, IsString, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class MedicionDto {
  @IsString() nombre: string;
  @IsString() @IsOptional() unidad?: string;
  @IsString() @IsOptional() valor?: string;
  @IsString() @IsOptional() referencia?: string;
}

export class SeccionDto {
  @IsInt() @Min(0) orden: number;
  @IsString() nombre: string;
  @IsString() @IsOptional() texto?: string;

  @IsArray() @ValidateNested({ each: true }) @Type(() => MedicionDto)
  mediciones: MedicionDto[];
}

export class CreateInformeDto {
  @IsString() @IsOptional()
  cuerpo?: string;

  @IsArray() @ValidateNested({ each: true }) @Type(() => SeccionDto)
  secciones: SeccionDto[];
}
