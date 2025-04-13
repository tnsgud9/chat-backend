import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Schemas } from 'src/database/schema';
import { Auth, AuthDocument } from 'src/database/schema/auth.schema';
import { ChatRoom } from 'src/database/schema/chatroom.schema';
import {
  generateRSAKeyPair,
  hybridEncrypt,
} from '../common/utils/crypto-helper';

@Injectable()
export class ChatService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Schemas.ChatRoom.name)
    private readonly chatroomModel: Model<ChatRoom>,
    @InjectModel(Schemas.Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  public async getAccounts(ids: ObjectId[]) {
    return await this.authModel.find({ _id: { $in: ids } }).exec();
  }

  public async createChatRoom(users: AuthDocument[]) {
    // 2. 채팅방을 위한 공개키, 개인키를 생성한다.
    const { publicKey, privateKey } = generateRSAKeyPair();

    // 3. auth 유저들의 공개키를 기반으로 개인키를 암호화한다.
    const encryptedPrivateKey: Map<ObjectId, string> = Object.fromEntries(
      users.map((it) => [
        it.id,
        hybridEncrypt(it.publicKey, privateKey.toString()),
      ]),
    );
    const chatroom = new this.chatroomModel({
      name: users.map((it) => it.nickname).join(', '),
      publicKey,
      encryptedPrivateKey,
    });

    await chatroom.save();
    return chatroom;
  }
}
