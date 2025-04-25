import { IsDate, IsEnum, IsMongoId, IsString } from 'class-validator';
import { ContentType } from '../enums/content.enum';
import { Expose } from 'class-transformer';

export class MessageDto {
  @Expose()
  @IsMongoId()
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
