import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ChatRoomDto {
  @IsMongoId()
  id: ObjectId;

  @IsString()
  name: string;
  // lastMessage: string;
}
