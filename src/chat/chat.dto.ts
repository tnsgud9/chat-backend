import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsString,
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

export class ChatRoomInfoRequest {}
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
