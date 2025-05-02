import { Expose } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @Expose()
  @IsMongoId()
  @ApiProperty({
    example: '67fb04d71bfdddcc5aa31e09',
    description: '유저의 고유 ID',
  })
  id: string;

  @Expose()
  @IsString()
  @ApiProperty({
    example: 'nickddname',
    description: '유저의 닉네임',
  })
  nickname: string;
}
