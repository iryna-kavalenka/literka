import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  app.use(json({ limit: '6mb' }));
  app.use(urlencoded({ extended: true, limit: '6mb' }));
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/api`,
  );
}

bootstrap();
