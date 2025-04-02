import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from 'src/common/enums/permission.enum';
import { BaseSchema } from './base.schema';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth extends BaseSchema {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    required: true,
    type: String,
    enum: Permission,
    default: Permission.USER,
  })
  permission: Permission;
  @Prop()
  nickname: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
