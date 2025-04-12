import { ArrayNotEmpty, IsArray, IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ChatRoomDto } from 'src/common/dto/chatroom.dto';

export class ChatRoomsResponseDto {
  chatrooms: ChatRoomDto[];
}

export class CreateChatRoomRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  participantId: ObjectId[];
}

export class CreateChatRoomResponseDto {
  @IsMongoId()
  id: ObjectId;

  @IsString()
  publicKey: string;

  @IsString()
  encryptedPrivateKey: string;
}

export class ChatRoomInfoResponseDto {}
