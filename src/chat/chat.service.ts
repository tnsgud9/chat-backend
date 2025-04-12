import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Schemas } from 'src/database/schema';
import { Auth } from 'src/database/schema/auth.schema';
import { ChatRoom } from 'src/database/schema/chatroom.schema';

@Injectable()
export class ChatService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Schemas.ChatRoom.name)
    private readonly chatRoomModel: Model<ChatRoom>,
    @InjectModel(Schemas.Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  public async getAccounts(ids: ObjectId[]) {
    return await this.authModel.findById({ ids }).exec();
  }
}
