import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: Types.ObjectId, required: true })
    user: Types.ObjectId;

    @Prop()
    text: string;
};

export const SchemaMessage = SchemaFactory.createForClass(Message);
