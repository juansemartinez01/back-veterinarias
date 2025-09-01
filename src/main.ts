// main.ts — Polyfill primero, imports después
async function bootstrap() {
  // 1) Polyfill de crypto ANTES de importar Nest/AppModule
  // Si tu TS se queja por 'node:crypto', usá 'crypto' en su lugar.
  const nodeCrypto = await import('node:crypto').catch(async () => await import('crypto'));
  if (!(globalThis as any).crypto || !(globalThis as any).crypto.randomUUID) {
    (globalThis as any).crypto = nodeCrypto as any;
  }

  // 2) Importes DINÁMICOS (evitan que se ejecute TypeORM antes del polyfill)
  const { NestFactory } = await import('@nestjs/core');
  const { AppModule } = await import('./app.module');
  const { ValidationPipe } = await import('@nestjs/common');

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0');
}

bootstrap();
