import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VeterinariasModule } from './veterinarias/veterinarias.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { ClientesModule } from './clientes/clientes.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { TurnosModule } from './turnos/turnos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { ImagenesModule } from './imagenes/imagenes.module';
import { InsumosModule } from './insumos/insumos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL, // 👉 Railway te la da con ?sslmode=require
        autoLoadEntities: true,
        synchronize: true, // ⚠️ solo en desarrollo, en prod usá migrations
        ssl: process.env.DATABASE_URL?.includes('sslmode=require')
          ? { rejectUnauthorized: false }
          : undefined,
      }),
    }),
    AuthModule,
    UsuariosModule,
    VeterinariasModule,
    FacturacionModule,
    ClientesModule,
    PacientesModule,
    TurnosModule,
    ConsultasModule,
    ImagenesModule,
    InsumosModule,
  ],
})
export class AppModule {}
