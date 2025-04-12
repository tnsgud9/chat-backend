import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({ timestamps: true, versionKey: false })
export class ChatRoom {}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
