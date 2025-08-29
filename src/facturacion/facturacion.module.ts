import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './factura.entity';
import { FacturaItem } from './factura-item.entity';
import { FacturacionService } from './facturacion.service';
import { FacturacionController } from './facturacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, FacturaItem])],
  providers: [FacturacionService],
  controllers: [FacturacionController],
})
export class FacturacionModule {}
