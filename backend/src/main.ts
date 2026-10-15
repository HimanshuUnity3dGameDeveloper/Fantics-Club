import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Allow requests from your local frontend
  app.enableCors({
    origin: [
      'http://localhost:8100',
      'http://localhost:4200',
    ],
    credentials: true,
  });
  // Validate incoming DTOs globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Server running on port ${port}`);
}
await bootstrap();
