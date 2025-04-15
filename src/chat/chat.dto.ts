import { ArrayNotEmpty, IsArray, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ChatRoomDto } from 'src/common/dto/chatroom.dto';
import { MessageDto } from 'src/common/dto/message.dto';

export class ChatRoomsResponseDto {
  chatrooms: ChatRoomDto[];
}

export class ChatRoomCreateRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  participantIds: Types.ObjectId[];
}

export class ChatRoomCreateResponseDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsString()
  name: string;

  @IsString()
  publicKey: string;

  @IsString()
  encryptedPrivateKey: string;
}

export class ChatRoomInfoResponseDto {
  @IsMongoId()
  roomId: Types.ObjectId;

  messages: MessageDto[];
}
