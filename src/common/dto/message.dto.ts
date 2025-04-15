import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class MessageDto {
  @IsMongoId()
  sender: Types.ObjectId;

  @IsString()
  content: string;
}
