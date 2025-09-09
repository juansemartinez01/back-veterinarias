async function bootstrap() {
    const nodeCrypto = await Promise.resolve().then(() => require('node:crypto')).catch(async () => await Promise.resolve().then(() => require('crypto')));
    if (!globalThis.crypto || !globalThis.crypto.randomUUID) {
        globalThis.crypto = nodeCrypto;
    }
    const { NestFactory } = await Promise.resolve().then(() => require('@nestjs/core'));
    const { AppModule } = await Promise.resolve().then(() => require('./app.module'));
    const { ValidationPipe } = await Promise.resolve().then(() => require('@nestjs/common'));
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map