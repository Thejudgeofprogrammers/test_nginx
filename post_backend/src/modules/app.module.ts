import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../configurations';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations]
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('mongo_url'),
            }),
            inject: [ConfigService],
        }),
        PostModule
    ],
})
export class AppModule {};
