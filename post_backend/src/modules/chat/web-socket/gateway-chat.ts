import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { IMessageSchemaDTO } from '../dto';

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) {};

    async handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    };

    async handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    };

    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, payload: { chatId: string, message: IMessageSchemaDTO }) {
        const chat = await this.chatService.addMessageToChat(payload.chatId, payload.message);
        this.server.to(payload.chatId).emit('newMessage', payload.message);
    };

    @SubscribeMessage('joinChat')
    handleJoinChat(client: Socket, chatId: string) {
        client.join(chatId);
    };
};