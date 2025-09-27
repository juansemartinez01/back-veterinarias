import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { UsageTokens } from "./organ-draft.dto"; // reutilizamos

export class AffectedOrganDto {
  @IsString()
  organ: string;

  @IsString()
  inform: string;
}

export class ObservationsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AffectedOrganDto)
  affected_organs: AffectedOrganDto[];
}

export class DraftConclusionInputDto {
  @IsString()
  consult_id: string;

  @IsString() // ej.: "es"
  language: string;

  @IsString() // ej.: "canino"
  specie: string;

  @IsString() // ej.: "PASTOR ALEMAN" (en mayúsculas si querés)
  raze: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;

  @IsString() // ej.: "MACHO" / "HEMBRA" / "DESCONOCIDO" (aceptamos string)
  sex: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  weight: number;

  @Type(() => Boolean)
  castrated: boolean;

  @IsString() // ej.: "ecografía"
  study: string;

  @IsString() // ej.: "abdominal"
  zone: string;

  @ValidateNested()
  @Type(() => ObservationsDto)
  observations: ObservationsDto;
}

export class DraftConclusionOutputDto {
  @IsString()
  conclusion: string;

  @IsString() // "leve" | "moderado" | "grave" (lo dejamos como string libre)
  gravedad: string;

  @IsArray()
  diagnosticos: string[]; // lo tipamos como array de strings

  @IsOptional()
  usage?: UsageTokens;
}
