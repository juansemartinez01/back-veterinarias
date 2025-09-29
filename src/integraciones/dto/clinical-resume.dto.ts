import {
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { UsageTokens } from "./organ-draft.dto"; // reutilizamos el tipo de usage

export class ClinicalReportItemDto {
  @IsString()
  organ: string;

  @IsString()
  inform: string;
}

export class ClinicalHistoryItemDto {
  @IsDateString()
  fecha: string; // "YYYY-MM-DD"

  @IsString()
  estudio: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClinicalReportItemDto)
  reportes: ClinicalReportItemDto[];
}

export class ClinicalResumeInputDto {
  @IsString()
  specie: string; // ej: "canino"

  @IsString()
  raze: string; // ej: "Labrador"

  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsIn(["es", "en"])
  language: "es" | "en";

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClinicalHistoryItemDto)
  history: ClinicalHistoryItemDto[];
}

export class ClinicalResumeOutputDto {
  @IsString()
  resumen: string;

  @IsOptional()
  usage?: UsageTokens;
}
