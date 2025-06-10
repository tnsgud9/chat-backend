import { IsMongoId, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
export class ChatRoomDto {
  @Expose()
  @IsMongoId()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  publicKey: string;

  @Expose()
  @IsString()
  encryptedPrivateKey: string;

  // @ApiProperty({ example: '마지막 메시지 내용', description: '채팅방의 마지막 메시지 (선택사항)' })
  // lastMessage: string;
}
