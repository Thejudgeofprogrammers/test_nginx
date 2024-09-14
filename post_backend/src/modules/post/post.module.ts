import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSch, PostSchema } from './models/post.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PostSch.name, schema: PostSchema },
        ]),
    ],
    providers: [PostService],
    controllers: [PostController]
})
export class PostModule { }
