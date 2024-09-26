import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatDocument } from "./models/Chat";
import { User, UserDocument } from "./models/User";  // Import User model
import { Model, Types } from "mongoose";
import { IChatSchemaDTO, IMessageSchemaDTO } from "./dto";
import { Message, MessageDocument } from "./models/Message";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,  // Inject user model
        @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    ) {}

    // Get or create user by email
    async getOrCreateUserByEmail(userEmail: string): Promise<UserDocument> {
        if (!userEmail) {
            throw new BadRequestException('Email is required');
        }
    
        let user = await this.userModel.findOne({ email: userEmail });
        if (!user) {
            user = await this.userModel.create({ email: userEmail, chats: [] });
        }
        return user;
    }
    

    async getChatById(chatId: string): Promise<Chat> {
        return this.chatModel.findById(chatId).populate('messages');
    }

    async createChat(dto: IChatSchemaDTO, userEmail: string): Promise<Chat> {
        const user: any = await this.getOrCreateUserByEmail(userEmail);
        if (!dto.title) throw new BadRequestException('Chat title is required');
        
        const chat = new this.chatModel({
            title: dto.title,
            creator: userEmail,
            peoples: [(user as any)._id],
            messages: [],
            createDate: Date.now()
        });

        await chat.save();
        user.chats.push(chat._id);  // Add chat to user's chat list
        await user.save();

        return chat;
    }

    async deleteChat(id: string): Promise<any> {
        return this.chatModel.findByIdAndDelete(id);
    }

    async addUserToChat(chatId: string, userId: Types.ObjectId): Promise<Chat> {
        return this.chatModel.findByIdAndUpdate(
            chatId,
            { $addToSet: { peoples: userId } },
            { new: true }
        );
    }

    async addUserByEmailToChat(chatId: string, email: string): Promise<Chat> {
        const user = await this.getOrCreateUserByEmail(email);
        return this.addUserToChat(chatId, (user as any)._id);
    }

    async addMessageToChat(chatId: string, message: IMessageSchemaDTO): Promise<Chat> {
        const newMessage = new this.messageModel(message);
        await newMessage.save();

        return this.chatModel.findByIdAndUpdate(
            chatId,
            { $push: { messages: newMessage._id } },
            { new: true }
        ).populate('messages');
    }
}
