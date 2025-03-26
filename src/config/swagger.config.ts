import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Authentication API')
  .setDescription('API documentation for the Authentication service')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('authentication')
  .addTag('users')
  .build();