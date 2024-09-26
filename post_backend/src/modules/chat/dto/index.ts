import { Types } from "mongoose";

export interface IChatSchemaDTO {
    title: string;
    creator: string; // email
    peoples: string[];
    messages: IMessageSchemaDTO[];
    createDate: Date;
};

export interface IChatSchemaResponse {
    title: string;
    creator: string; // email
    peoples: string[];
    messages: IMessageSchemaDTO[];
    createDate: Date;
    userEmail: string;
};

export interface IMessageSchemaDTO {
    user: Types.ObjectId;
    text: string;
};

export class CreateChatDto {
    title: string;
    creator: string;
}