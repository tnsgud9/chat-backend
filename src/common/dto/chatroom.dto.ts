import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ChatRoomDocument } from '../../database/schema/chatroom.schema';

export class ChatRoomDto {
  constructor(chatroomDocument: ChatRoomDocument) {
    this.id = chatroomDocument.id;
    this.name = chatroomDocument.name;
  }
  @IsMongoId()
  id: Types.ObjectId;

  @IsString()
  name: string;
  // lastMessage: string;
}
