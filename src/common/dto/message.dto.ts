import { IsDate, IsEnum, IsMongoId, IsString } from 'class-validator';
import { ContentType } from '../enums/content.enum';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @Expose()
  @IsMongoId()
  @Type(() => String)
  @ApiProperty({
    example: '6814f40ec02378f498960ea8',
    description: '보낸 사람의 유저 ID',
  })
  sender: string;

  @Expose()
  @IsEnum(ContentType)
  @ApiProperty({
    example: ContentType.MESSAGE,
    enum: ContentType,
    description: '메시지의 콘텐츠 유형',
  })
  contentType: ContentType;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'Hello!',
    description: '메시지 내용',
  })
  content: string;

  @Expose()
  @IsDate()
  @ApiProperty({
    example: '2025-04-20T00:56:21.701Z',
    description: '메시지 생성 시각',
  })
  createdAt: Date;
}
