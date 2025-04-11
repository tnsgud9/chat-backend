import { ChannelDto } from 'src/common/dto/channel.dto';
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

export class UserChannelsResponseDto {
  channels: ChannelDto[];
}
