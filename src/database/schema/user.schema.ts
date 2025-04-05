import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// 'Auth' 모델의 문서 타입을 정의
export type UserDocument = HydratedDocument<User>;

// Auth 스키마 정의
@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ default: uuidv4 }) // UUIDv4를 기본값으로 설정 (unique 속성 제거)
  _id: string;

  @Prop({ type: [String], default: [] }) // 친구 리스트
  friends: string[];

  @Prop({ type: [String], default: [] }) // 친구 요청 리스트
  friendRequests: string[];

  @Prop({ type: [String], default: [] }) // 채팅방 리스트
  chatRooms: string[];
}

// Auth 클래스를 바탕으로 Mongoose 스키마를 생성
export const UserSchema = SchemaFactory.createForClass(User);
