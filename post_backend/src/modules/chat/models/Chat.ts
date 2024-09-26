import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    creator: string

    @Prop({ type: [Types.ObjectId] })
    peoples: string[];

    @Prop({ type: [Types.ObjectId], ref: 'Message', default: [] })
    messages: Types.ObjectId[];

    @Prop({ type: Date, default: Date.now })
    createDate: Date;
};

export const SchemaChat = SchemaFactory.createForClass(Chat);
