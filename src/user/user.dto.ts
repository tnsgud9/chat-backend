import { ChannelDto } from 'src/common/dto/channel.dto';

export class UserSearchQueryReqeustDto {
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
