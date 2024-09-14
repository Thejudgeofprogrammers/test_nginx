import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PostSchemaDocument = PostSch & Document;

@Schema({ timestamps: true })
export class PostSch {
    @Prop({ type: Object })
    message: {
        text: {
            date: number;
            data: {
                content: string;
            };
        };
    };
};

export const PostSchema = SchemaFactory.createForClass(PostSch);