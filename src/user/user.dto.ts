import { IsString } from 'class-validator';

export class UserSearchQueryRequestDto {
  @IsString()
  nickname: string;
}

export class UserSearchResponseDto {
  id: string;
  nickname: string;
  publicKey: string;
}
