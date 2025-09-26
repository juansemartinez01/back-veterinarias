import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class OrganDraftInputDto {
  @IsString()
  consult_id: string;

  // OJO: el sistema externo usa "specie" (no "species")
  @IsString()
  @IsIn(["canino", "felino", "equino", "bovino", "otro"], {
    message: "specie inválida",
  })
  specie: string;

  // OJO: el sistema externo usa "raze" (no "raza")
  @IsString()
  raze: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsIn(["macho", "hembra", "desconocido"])
  sex: "macho" | "hembra" | "desconocido";

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  weight: number;

  @Type(() => Boolean)
  @IsBoolean()
  castrated: boolean;

  @IsString()
  study: string; // ej. "ecografía"

  @IsString()
  zone: string; // ej. "abdominal"

  @IsString()
  organ: string; // ej. "riñón izquierdo"

  @IsString()
  observation: string;

  @IsString()
  @IsIn(["es", "en"])
  language: "es" | "en";
}

// respuesta del externo
export class UsageTokens {
  @IsOptional() @IsInt() prompt_tokens?: number;
  @IsOptional() @IsInt() completion_tokens?: number;
  @IsOptional() @IsInt() total_tokens?: number;
}

export class OrganDraftOutputDto {
  @IsString() consult_id: string;
  @IsString() inform: string;
  @IsOptional() usage?: UsageTokens;
}
