import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { UserRole } from './user-role.entity';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, UserRole])],
  providers: [RbacService, RolesGuard],
  controllers: [RbacController],
  exports: [RbacService, RolesGuard],
})
export class RbacModule {}
