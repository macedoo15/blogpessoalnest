import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact(
      'Daniel Macedo',
      'https://www.linkedin.com/in/daniel-macedo33/',
      'https://github.com/macedoo15',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().catch((error) => {
  console.error('Erro ao iniciar aplicação:', error);
});
