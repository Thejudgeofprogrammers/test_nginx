import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatDocument } from "./models/Chat";
import { Model, Types } from "mongoose";
import { IChatSchemaDTO, IMessageSchemaDTO } from "./dto";
import { Message, MessageDocument } from "./models/Message";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
        @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
        private readonly httpService: HttpService
    ) {}

    async createChat(dto: IChatSchemaDTO, userEmail: string): Promise<Chat> {
        try {
            // Получаем userId по email из микросервиса пользователей
            const response = await lastValueFrom(
                this.httpService.get(`http://auth_backend/api/user/by-email`, { params: { email: userEmail } })
            );
            const userId = response.data.userId;

            // Создаем новый чат и указываем userId создателя
            const chat = new this.chatModel({ ...dto, creator: userId });
            const savedChat = await chat.save();

            // Сообщаем микросервису пользователей о созданном чате (сохраняем его в списке чатов пользователя)
            await lastValueFrom(
                this.httpService.put(`http://auth_backend/api/user/${userEmail}/add-chat`, { chatId: savedChat._id })
            );

            return savedChat;
        } catch (error) {
            console.error('Error creating chat:', error);
            throw error;
        };
    };

    async deleteChat(id: string): Promise<any> {
        return this.chatModel.findByIdAndDelete(id);
    };

    async addUserToChat(chatId: string, userId: Types.ObjectId): Promise<Chat> {
        return this.chatModel.findByIdAndUpdate(
            chatId,
            { $addToSet: { peoples: userId } },
            { new: true }
        );
    };

    async addUserByEmailToChat(chatId: string, email: string): Promise<Chat> {
        try {
            // Получаем данные о пользователе по email
            const response = await lastValueFrom(
                this.httpService.get(`http://auth_backend/api/user/${email}`)
            );

            const userId = response.data._id;

            if (typeof userId === 'string') {
                return this.addUserToChat(chatId, new Types.ObjectId(userId));
            } else {
                throw new Error('Invalid userId format');
            }
        } catch (error) {
            console.error('Error adding user by email to chat:', error);
            throw error;
        };
    };

    async addMessageToChat(chatId: string, message: IMessageSchemaDTO): Promise<Chat> {
        const newMessage = new this.messageModel(message);
        await newMessage.save();

        return this.chatModel.findByIdAndUpdate(
            chatId,
            { $push: { messages: newMessage._id } },
            { new: true }
        );
    };
};