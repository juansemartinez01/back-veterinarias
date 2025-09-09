import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './servicio.entity';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { RbacModule } from 'src/auth/rbac/rbac.module';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio]),RbacModule],
  providers: [ServiciosService],
  controllers: [ServiciosController],
  exports: [ServiciosService],
})
export class ServiciosModule {}
