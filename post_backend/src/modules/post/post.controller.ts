import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { IMessageDTO } from './dto';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {};
    
    @Get()
    async get_data() {
        return await this.postService.findAll();
    };

    @Post()
    async save_data(
        @Body() body: { message: IMessageDTO }
    ): Promise<object> {
        const savedMessage = await this.postService.saveMessages(body.message);
        return { message: 'Request received!', data: savedMessage };
    };

    @Delete()
    async delete_data() {
        return await this.postService.deleteAll();
    };
};

// Переделать под websocket и добавить Update