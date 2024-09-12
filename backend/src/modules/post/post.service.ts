import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSch, PostSchemaDocument } from './modules/post.model';

export interface IMessageDTO {
    text: {
      date: number;
      data: {
        content: string;
      };
    };
}

@Injectable()
export class PostService {
    constructor(
        @InjectModel(PostSch.name) private readonly postModel: Model<PostSchemaDocument>,
    ) {};

    async saveMessages(
        message: IMessageDTO
    ) {
        try {
            const newPost = new this.postModel({ message });
            console.log(message);
            return await newPost.save();
          } catch (err) {
            throw err;
          }
    };
};
