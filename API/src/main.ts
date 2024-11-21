import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3001', // Substitua com a URL do seu frontend
    credentials: true, // Permitir envio de cookies de outros domínios
  });

  await app.listen(3000);
}
bootstrap();
