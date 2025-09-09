// src/plantillas/dto/create-plantilla.dto.ts
import { IsIn, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreatePlantillaDto {
  @IsString() @IsNotEmpty()
  code: string;

  @IsIn(['email', 'whatsapp'])
  canal: 'email' | 'whatsapp';

  @IsOptional() @IsString()
  subject?: string;

  @IsString() @IsNotEmpty()
  body: string;
}
