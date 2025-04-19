import { IsEnum, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ContentType } from '../enums/content.enum';
import { Expose } from 'class-transformer';

export class MessageDto {
  @Expose()
  @IsMongoId()
  sender: Types.ObjectId;

  @Expose()
  @IsEnum(ContentType)
  contentType: ContentType;

  @Expose()
  @IsString()
  content: string;
}
