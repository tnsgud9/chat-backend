import { Expose } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

export class UserInfoDto {
  @Expose()
  @IsMongoId()
  id: string;

  @Expose()
  @IsString()
  nickname: string;
}
