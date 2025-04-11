import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { UserSearchQueryReqeustDto, UserSearchResponseDto } from './user.dto';
import { DatabaseService } from 'src/database/database.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get(ApiRoutes.User.Search)
  async userSearch(
    @Query() { nickname }: UserSearchQueryReqeustDto,
  ): Promise<UserSearchResponseDto> {
    const user = await this.userService.getAccountInfo(nickname);
    if (!user) {
      throw new NotFoundException('존재하는 않거나 없는 계정입니다.');
    }
    return { id: user.id, nickname: user.nickname, publicKey: user.publicKey };
  }
}
