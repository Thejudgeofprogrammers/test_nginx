import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import configurations from '../configurations';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations]
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: "postgres",
                host: configService.get('db_host'),
                port: configService.get('db_port'),
                username: configService.get('db_user'),
                password: configService.get('db_password'),
                database: configService.get('db_name'),
                synchronize: true,
                autoLoadModels: true,
                models: [User]
            })
        }),
        UserModule,
        AuthModule,
        TokenModule
    ],
})
export class AppModule {};
