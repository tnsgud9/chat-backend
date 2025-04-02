import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // uuidv4 임포트

@Schema({ timestamps: true, id: false }) // 기본 _id 사용 안 함
export class BaseSchema extends Document {
  @Prop({ type: String, default: uuidv4 }) // uuidv4로 기본값 설정
  public uid: string; // uuidv4를 기준으로 생성된 uid 필드

  // createdAt, updatedAt은 Mongoose가 자동으로 관리
}

export const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);
