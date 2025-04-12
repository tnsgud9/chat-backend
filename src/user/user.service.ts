import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schemas } from 'src/database/schema';
import { Auth } from 'src/database/schema/auth.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Schemas.Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  public async getAccountInfo(nickname: string) {
    const user = await this.authModel.findOne({ nickname }).exec();
    return user;
  }

  // public async getChatRooms(nickname: string) {
  //   const user = await this.authModel.findOne({ nickname }).exec();
  //   return user;
  // }
}
