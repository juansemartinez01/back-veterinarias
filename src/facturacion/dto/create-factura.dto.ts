import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsString } from 'class-validator';
import { CreateFacturaItemDto } from './create-factura-item.dto';

export class CreateFacturaDto {
  @IsString()
  clienteId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFacturaItemDto)
  items: CreateFacturaItemDto[];
}
