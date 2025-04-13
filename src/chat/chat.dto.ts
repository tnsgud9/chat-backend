import { ArrayNotEmpty, IsArray, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ChatRoomDto } from 'src/common/dto/chatroom.dto';

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

export class ChatRoomInfoResponseDto {}
