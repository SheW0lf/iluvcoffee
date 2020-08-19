import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, //whitelist strips all other properties not defined in the DTO from the req (incase any were added maliciously or otherwise) so they do not get added to the res obj
            forbidNonWhitelisted: true, // this will throw an error if any other properties not defined in the DTO were added to the req
            transform: true, // transforms variables to instances of the data they are described to be. example id comes from @Param as a string but if we type it as a number, transform will do the conversion without a pipe
        }),
    );
    await app.listen(3000);
}
bootstrap();
