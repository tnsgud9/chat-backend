import { IsMongoId, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ChatRoomDto {
  @Expose()
  @IsMongoId()
  id: string;

  @Expose()
  @IsString()
  name: string;
  // lastMessage: string;
}
