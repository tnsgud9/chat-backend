import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChatRoomDto } from 'src/common/dto/chatroom.dto';
import { MessageDto } from 'src/common/dto/message.dto';
import { UserInfoDto } from 'src/common/dto/userinfo.dto';
import { ContentType } from 'src/common/enums/content.enum';

export class ChatRoomsResquest {}

export class ChatRoomsResponse {
  @ApiProperty({
    type: [ChatRoomDto],
    description: '채팅방 목록',
  })
  chatrooms: ChatRoomDto[];
}

export class ChatRoomCreateRequest {
  @ApiProperty({
    type: [String],
    description: '참여자들의 MongoDB ID 목록',
    example: ['60c72b2f9fd6f5c1e2b3c4d5', '60c72b2f9fd6f5c1e2b3c4d6'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  participantIds: string[];
}

export class ChatRoomCreateResponse {
  @ApiProperty({
    description: '채팅방 ID',
    example: '60c72b2f9fd6f5c1e2b3c4d5',
  })
  @IsMongoId()
  id: string;

  @ApiProperty({
    description: '채팅방 이름',
    example: 'example-chatroom',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '채팅방 공개키 (PEM 형식)',
    example:
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzVxYyQ5wV7qCnYXNxzlf9u/7p/g+R5zyfdr0RV60dkPMQ0ZLrfqA+I6vJKlNh5zsmj7ZpkLWyFCNjsK73O9p1lDiD7tF0X5LkL4kpxdERl+AVZyW2tTmHfH9/nmK9cQ0tn/vNK6kgoxXFCERm7gX20wLvP0=',
  })
  @IsString()
  publicKey: string;

  @ApiProperty({
    description:
      '암호화된 개인키 (하이브리드 암호화 방식: RSA로 암호화된 AES 키 + AES로 암호화된 개인키, ":" 구분자 사용)',
    example:
      'cd7utOAv4McLzXc+0LLqVQ==:eKIzihdln98jUs2sCYNDSbjTyowaUQ+mKDnP7VY8PddlEGEFQAMPIqI6+1Z/kr7s55QToRMRZyGH40qFIEa9ZQlmt5Py5Cez/X4hwvdSp3nbIi6kofH96jvAumebVvVbf3Ng=',
  })
  @IsString()
  encryptedPrivateKey: string;
}

export class ChatRoomInfoRequestQuery {
  @ApiProperty({
    description: '이전 메시지 시간 (optional)',
    example: '2025-05-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  before?: Date;

  @ApiProperty({
    description: '조회할 메시지 수 (최대 20개)',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Max(20)
  limit?: number;
}
export class ChatRoomInfoResponse {
  @ApiProperty({
    example: '67fb2b7d0de10cc1e5982e49',
    description: '채팅방의 고유 ID',
  })
  roomId: string;

  @ApiProperty({
    type: [MessageDto],
    description: '채팅방 내 메시지 목록',
  })
  messages: MessageDto[];

  @ApiProperty({
    type: [UserInfoDto],
    description: '채팅방 참가자 목록',
  })
  participants: UserInfoDto[];
}

export class ChatRoomSendMessageRequest {
  @ApiProperty({
    description: '전송할 메시지 내용',
    example: 'Hello, world!',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '콘텐츠 유형 (예: 텍스트, 이미지 등)',
    enum: ContentType,
    example: ContentType.MESSAGE,
  })
  @IsEnum(ContentType)
  contentType: ContentType;
}
