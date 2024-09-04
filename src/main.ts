import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Api v1.0')
    .setDescription('The template backend API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function configureApp(app) {
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await setupSwagger(app);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await configureApp(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
}

bootstrap();