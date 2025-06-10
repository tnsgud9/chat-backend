import { IsDate, IsEnum, IsMongoId, IsString } from 'class-validator';
import { ContentType } from '../enums/content.enum';
import { Expose, Type } from 'class-transformer';

export class MessageDto {
  @Expose()
  @IsMongoId()
  @Type(() => String)
  sender: string;

  @Expose()
  @IsEnum(ContentType)
  contentType: ContentType;

  @Expose()
  @IsString()
  content: string;

  @Expose()
  @IsDate()
  createdAt: Date;
}
