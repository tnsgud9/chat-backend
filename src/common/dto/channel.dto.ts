import { ObjectId } from 'mongoose';

export class ChannelDto {
  name: string;
  userIds: ObjectId[];
  userNicknames: string[];
  // lastMessage: string;
}
