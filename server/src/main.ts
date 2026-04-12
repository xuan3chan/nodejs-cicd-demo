import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const isProd = process.env.NODE_ENV === 'production';

  // ── Security Headers ──
  app.use(
    helmet({
      contentSecurityPolicy: false, // Cho phép inline scripts (React)
      crossOriginEmbedderPolicy: false, // Cho phép nhúng Cloudinary media
    }),
  );

  // ── Gzip Compression (giảm ~70% bandwidth) ──
  app.use(compression());

  // ── CORS ──
  app.enableCors({
    origin: isProd
      ? [process.env.CORS_ORIGIN || 'https://yourdomain.com']
      : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    maxAge: 86400, // Preflight cache 24h
  });

  // ── Global Validation ──
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ── MVC: Handlebars view engine ──
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // ── Static files (serve React build assets: JS, CSS, images) ──
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    maxAge: isProd ? '30d' : 0,
  });

  // ── Graceful Shutdown (cho Docker/K8s SIGTERM) ──
  app.enableShutdownHooks();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(
    `🚀 Bún Quậy 79 [${isProd ? 'PROD' : 'DEV'}] running on http://localhost:${port}`,
  );
}
void bootstrap();
