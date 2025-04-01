import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from 'src/common/enums/permission.enum';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop()
  uid: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop({ type: String, enum: Permission, default: Permission.USER })
  permission: Permission;
  @Prop()
  nickname: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
