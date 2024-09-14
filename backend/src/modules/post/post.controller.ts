import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { IMessageDTO, PostService } from './post.service';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {};
    
    @Post()
    async save_data(
        @Body() body: { message: IMessageDTO}
    ): Promise<object> {
        const savedMessage = await this.postService.saveMessages(body.message);
        return { message: 'Request received!', data: savedMessage };
    };

    @Get()
    async get_data() {
        return await this.postService.findAll();
    };

    @Delete()
    async delete_data() {
        return await this.postService.deleteAll();
    }
};
