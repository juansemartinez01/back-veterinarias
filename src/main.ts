import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as nodeCrypto from 'node:crypto';

// Polyfill para entornos donde global.crypto no está definido (Node 18)
if (!(global as any).crypto || !(global as any).crypto.randomUUID) {
  (global as any).crypto = nodeCrypto as any;
}

async function bootstrap() {
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
