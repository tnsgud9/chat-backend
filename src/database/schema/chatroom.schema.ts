import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({ timestamps: true, versionKey: false })
export class ChatRoom {
  // 방 이름
  @Prop()
  name: string;

  // 공개키
  @Prop({ required: true })
  publicKey: string;

  // 개인키를 각 유저들의 공개키로 암호화한다.
  @Prop({ required: true })
  encryptedPrivateKey: Map<Types.ObjectId, string>;

  // messages
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
