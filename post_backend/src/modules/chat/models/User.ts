import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ ref: 'Chat', default: []})
    chats: Types.ObjectId[];
};

export const SchemaUser = SchemaFactory.createForClass(User);
