import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, SchemaChat } from "./models/Chat";
import { Message, SchemaMessage } from "./models/Message";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./web-socket/gateway-chat";
import { HttpModule } from "@nestjs/axios";
import { SchemaUser, User } from "./models/User";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Chat.name, schema: SchemaChat },
            { name: Message.name, schema: SchemaMessage },
            { name: User.name, schema: SchemaUser }
        ]),
        HttpModule
    ],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway]
})
export class ChatModule {};
