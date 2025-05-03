import { IsMongoId, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRoomDto {
  @Expose()
  @IsMongoId()
  @ApiProperty({
    example: '67fb2b7d0de10cc1e5982e49',
    description: '채팅방의 고유 ID',
  })
  id: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: '친구들과의 대화방',
    description: '채팅방 이름',
  })
  name: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKj...',
    description: '채팅방의 공개 키 (메시지 암호화에 사용)',
  })
  publicKey: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'U2FsdGVkX1+3hN47nZ+7cqZhTC7fsPv...',
    description: '유저 공개키로 암호화된 채팅방 개인 키',
  })
  encryptedPrivateKey: string;

  // @ApiProperty({ example: '마지막 메시지 내용', description: '채팅방의 마지막 메시지 (선택사항)' })
  // lastMessage: string;
}
