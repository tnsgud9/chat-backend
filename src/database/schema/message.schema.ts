import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: Types.ObjectId, required: true })
  chatRoomId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

// Message 클래스를 바탕으로 Mongoose 스키마를 생성
export const MessageSchema = SchemaFactory.createForClass(Message);
