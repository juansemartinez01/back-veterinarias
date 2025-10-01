// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// módulos existentes…
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

// módulos previos
import { TenantSettingsModule } from './tenant-settings/tenant-settings.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { RbacModule } from './auth/rbac/rbac.module';
import { ServiciosModule } from './servicios/servicios.module';

// módulos nuevos (Etapa 3)
import { PlantillasModule } from './plantillas/plantillas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { TurnosEstadoModule } from './turnos-estado/turnos-estado.module';


import { EstudiosModule } from './estudios/estudios.module';
import { InformesModule } from './informes/informes.module';

import { MediaModule } from './media/media.module';
import { TagsModule } from './tags/tags.module';
import { RazasModule } from './razas/razas.module';
import { EspeciesModule } from './especies/especies.module';
import { OrganDraftModule } from './integraciones/organ-draft.module';
import { SttModule } from './integraciones/stt.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true, //process.env.NODE_ENV !== 'production',
        ssl: process.env.DATABASE_URL?.includes("sslmode=require")
          ? { rejectUnauthorized: false }
          : undefined,
      }),
    }),

    // cron
    ScheduleModule.forRoot(),

    // existentes
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

    // previos
    TenantSettingsModule,
    AuditLogModule,
    RbacModule,
    ServiciosModule,

    // nuevos
    PlantillasModule,
    NotificacionesModule,
    TurnosEstadoModule,
    EstudiosModule,
    InformesModule,
    MediaModule,
    TagsModule,
    RazasModule,
    EspeciesModule,
    // Integraciones
    OrganDraftModule,
    SttModule,
  ],
})
export class AppModule {}
