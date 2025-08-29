import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VeterinariasModule } from './veterinarias/veterinarias.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { ClientesModule } from './clientes/clientes.module';
import { Paciente } from './pacientes/paciente.entity';
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
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        synchronize: true, // 🔁 SOLO EN DEV
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
