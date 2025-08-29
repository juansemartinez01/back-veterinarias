import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinaria } from './veterinaria.entity';
import { VeterinariasService } from './veterinarias.service';
import { VeterinariasController } from './veterinarias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinaria])],
  providers: [VeterinariasService],
  controllers: [VeterinariasController],
  exports: [VeterinariasService],
})
export class VeterinariasModule {}
