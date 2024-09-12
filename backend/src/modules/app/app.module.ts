import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nest'),

    PostModule
  ],
})
export class AppModule {};
