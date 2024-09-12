import { Body, Controller, Post } from '@nestjs/common';
import { IMessageDTO, PostService } from './post.service';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {};
    
    @Post()
    async get_data(
        @Body() body: { message: IMessageDTO}
    ): Promise<object> {
        const savedMessage = await this.postService.saveMessages(body.message);
        return { message: 'Request received!', data: savedMessage };
    };
};
