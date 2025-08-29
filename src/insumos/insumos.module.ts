import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insumo } from './insumo.entity';
import { InsumosService } from './insumos.service';
import { InsumosController } from './insumos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Insumo])],
  providers: [InsumosService],
  controllers: [InsumosController],
})
export class InsumosModule {}
