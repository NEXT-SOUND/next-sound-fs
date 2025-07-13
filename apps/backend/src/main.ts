import cookieParser from 'cookie-parser';



import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';



import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  const port = process.env.PORT || 5024;
  await app.listen(port);
}
bootstrap();