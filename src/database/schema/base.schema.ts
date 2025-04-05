import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true }) // createdAt과 updatedAt을 자동으로 관리
export class BaseSchema extends Document {
  @Prop({ default: uuidv4, unique: true }) // 기본값을 UUIDv4로 설정
  public uid: string; // uuidv4를 기준으로 생성된 uid 필드

  // createdAt, updatedAt은 Mongoose가 자동으로 관리
}

export const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);

BaseSchemaFactory.pre('save', function (next) {
  if (!this.uid) {
    this.uid = uuidv4(); // uid가 없으면 UUIDv4를 생성하여 할당
  }
  next();
});
