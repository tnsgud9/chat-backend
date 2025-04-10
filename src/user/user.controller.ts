import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { UserSearchQueryReqeustDto, UserSearchResponseDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/database/schema/auth.schema';
import { Schemas } from 'src/database/schema';
import { Model } from 'mongoose';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel(Schemas.Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  @Get(ApiRoutes.User.Search)
  async userSearch(
    @Query() { id }: UserSearchQueryReqeustDto,
  ): Promise<UserSearchResponseDto> {
    const user = await this.authModel.findOne({ _id: id }).exec();
    return { id: user?.id };
  }
}
