import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// User 스키마 정의
@Schema({ timestamps: true, versionKey: false })
export class User {
  // @Prop()
  // avatarUrl: string;

  // @Prop()
  // statusMessage: string;

  @Prop({ type: [String], default: [] }) // 친구 리스트
  friends: Types.ObjectId[];

  @Prop({ type: [String], default: [] }) // 친구 요청 리스트
  friendRequests: Types.ObjectId[];
}

// User 클래스를 바탕으로 Mongoose 스키마를 생성
export const UserSchema = SchemaFactory.createForClass(User);
