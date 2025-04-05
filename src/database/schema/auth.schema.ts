import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from 'src/common/enums/permission.enum';
import { BaseSchema } from './base.schema';

// 'Auth' 모델의 문서 타입을 정의
// HydratedDocument는 Mongoose에서 MongoDB에서 로드된 후의 문서를 나타낸다.
export type AuthDocument = HydratedDocument<Auth>;

// Auth 스키마 정의
@Schema()
export class Auth extends BaseSchema {
  // 필수, 고유한 사용자명
  @Prop({ required: true, unique: true })
  username: string;

  // 필수 비밀번호
  @Prop({ required: true })
  password: string;

  // 필수, 권한 열거형 (기본값: USER)
  @Prop({
    required: true,
    type: String,
    enum: Permission,
    default: Permission.USER,
  })
  permission: Permission;

  // 닉네임
  @Prop({ required: true })
  nickname: string;
}

// Auth 클래스를 바탕으로 Mongoose 스키마를 생성
// 'SchemaFactory.createForClass(Auth)'는 'Auth' 클래스를 Mongoose에서 사용할 수 있는 스키마 객체로 변환
export const AuthSchema = SchemaFactory.createForClass(Auth);
