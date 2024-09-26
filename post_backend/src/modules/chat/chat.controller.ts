import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto, IChatSchemaDTO, IChatSchemaResponse } from "./dto";

@Controller('api/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get()
    async getChatsByEmail(@Query('email') email: string) {
        return this.chatService.getChatsByEmail(email);
    };

    @Post()
    async createChat(@Body() createChatDto: CreateChatDto) {
        return this.chatService.createChat(createChatDto);
    }

    @Delete(':id')
    async deleteChat(@Param('id') id: string) {
        return this.chatService.deleteChat(id);
    }

    @Put(':chatId/user')
    async addUserByEmailToChat(
        @Param('chatId') chatId: string,
        @Query('email') email: string
    ) {
        return this.chatService.addUserByEmailToChat(chatId, email);
    }
}
