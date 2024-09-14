import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSch, PostSchemaDocument } from './models/post.model';
import { IMessageDTO } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostSch.name) private readonly postModel: Model<PostSchemaDocument>,
  ) { };

    async saveMessages(
        message: IMessageDTO
    ) {
        try {
            const newPost = new this.postModel({ message });
            console.log(message);
            return await newPost.save();
        } catch (err) {
            throw err;
        };
    };

    async findAll() {
        try {
            const posts = await this.postModel.find().exec();
            return posts.map(post => post.message);
        } catch (err) {
            throw err;  
        };
    };

    async deleteAll() {
        try {
            return await this.postModel.deleteMany({}).exec();
        } catch (err) {
            throw err;  
        };
    };
};
