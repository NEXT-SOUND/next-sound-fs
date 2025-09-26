import cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));

  // 쿠키 파싱 미들웨어 설정
  app.use(cookieParser());

  // CORS 설정 - credentials를 포함한 요청 허용
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'], // 프론트엔드 URL들
    credentials: true, // 쿠키/세션 허용
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(5024);
}

bootstrap();
