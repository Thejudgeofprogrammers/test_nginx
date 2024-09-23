import { Types } from "mongoose";

export interface IChatSchemaDTO {
    creator: Types.ObjectId
    peoples: string[];
    messages: IMessageSchemaDTO[];
    createDate: Date;
};

export interface IMessageSchemaDTO {
    user: Types.ObjectId;
    text: string;
};

