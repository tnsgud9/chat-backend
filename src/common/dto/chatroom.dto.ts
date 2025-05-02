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

  // @ApiProperty({ example: '마지막 메시지 내용', description: '채팅방의 마지막 메시지 (선택사항)' })
  // lastMessage: string;
}
