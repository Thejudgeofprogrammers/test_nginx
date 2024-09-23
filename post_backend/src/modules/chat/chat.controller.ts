import { Body, Controller, Delete, Param, Post, Put, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Types } from "mongoose";
import { IChatSchemaDTO } from "./dto";

@Controller('api/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    async createChat(
        @Body() chatDto: IChatSchemaDTO,
        @Query('email') userEmail: string
    ) {
        return this.chatService.createChat(chatDto, userEmail);
    }

    @Delete(':id')
    async deleteChat(@Param('id') id: string) {
        return this.chatService.deleteChat(id);
    };

    @Put(':chatId/user/:userId')
    async addUserToChat(
        @Param('chatId') chatId: string,
        @Param('userId') userId: string
    ) {
        return this.chatService.addUserToChat(chatId, new Types.ObjectId(userId));
    };
};