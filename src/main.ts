import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      name: 'session',
      secret: '128h381h38',
      cookie: {
        secure: false,
      },
    }),
  );

  // app.enableCors({
  //   origin: 'http://localhost:5173',
  //   credentials: true,
  // });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );

  // const config = new DocumentBuilder()
  //   .setTitle('Median')
  //   .setDescription('The Median API description')
  //   .setVersion('0.1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
