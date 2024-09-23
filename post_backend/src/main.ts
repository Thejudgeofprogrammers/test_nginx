import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(4050);
    // const configService = app.get(ConfigService);

    // const host = configService.get('host') || 'localhost';
    // const port = parseInt(configService.get('port')) || 4050;

    // const microserviceOptions: MicroserviceOptions = {
    //     transport: Transport.TCP,
    //     options: {
    //         host: host,
    //         port: port
    //     }
    // };

    // app.connectMicroservice(microserviceOptions);

    // await app.startAllMicroservices();
};
bootstrap();
