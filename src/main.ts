import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Full House')
    .setDescription('API Documents for Full House')
    .setVersion('1.0')
    .addTag('fullHouse')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);

  Logger.log('full-house-backend is up @ http://localhost:3000/api-docs');
}
bootstrap();
