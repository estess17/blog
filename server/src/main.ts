import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Blog API')
        .setDescription('Blog API description')
        .setVersion('1.0')
        .addTag('blog')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap();
