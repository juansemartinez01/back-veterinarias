import { IsString, IsNumber, Min } from 'class-validator';

export class CreateFacturaItemDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  precioUnitario: number;

  @IsNumber()
  @Min(1)
  cantidad: number;
}
