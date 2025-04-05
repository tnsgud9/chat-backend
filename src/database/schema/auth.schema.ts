import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from 'src/common/enums/permission.enum';
import { v4 as uuidv4 } from 'uuid';

// 'Auth' 모델의 문서 타입을 정의
export type AuthDocument = HydratedDocument<Auth>;

// Auth 스키마 정의
@Schema({ timestamps: true, versionKey: false })
export class Auth {
  @Prop({ default: uuidv4 }) // UUIDv4를 기본값으로 설정 (unique 속성 제거)
  _id: string;

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
export const AuthSchema = SchemaFactory.createForClass(Auth);

// save 시에 uid가 없으면 UUIDv4를 자동으로 생성하여 할당하는 pre save 훅
AuthSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuidv4(); // uid가 없으면 UUIDv4를 생성하여 할당
  }
  next();
});
