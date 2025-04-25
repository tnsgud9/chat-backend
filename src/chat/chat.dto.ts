import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import { ChatRoomDto } from 'src/common/dto/chatroom.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { UserInfoDto } from 'src/common/dto/userinfo.dto';
import { ContentType } from 'src/common/enums/content.enum';

export class ChatRoomsResquest {}

export class ChatRoomsResponse {
  chatrooms: ChatRoomDto[];
}

export class ChatRoomCreateRequest {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  participantIds: string[];
}

export class ChatRoomCreateResponse {
  @IsMongoId()
  id: string;

  @IsString()
  name: string;

  @IsString()
  publicKey: string;

  @IsString()
  encryptedPrivateKey: string;
}

export class ChatRoomInfoRequestQuery {
  @IsOptional()
  @IsDate()
  before?: Date; // 이전 메시지의 _id (또는 createdAt)

  @IsOptional()
  @IsNumber()
  @Max(20)
  limit?: number;
}
export class ChatRoomInfoResponse {
  @IsMongoId()
  roomId: string;

  participants: UserInfoDto[];
  messages: MessageDto[];
}

export class ChatRoomSendMessageRequest {
  @IsString()
  content: string;

  @IsEnum(ContentType)
  contentType: ContentType;
}

// export class ChatRoomSendMessageResponeDto {
//   @IsString()
//   content: string;
// }
