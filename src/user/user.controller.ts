import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { UserSearchQueryRequestDto, UserSearchResponseDto } from './user.dto';
import { AuthAccessTokenGuard } from '../auth/auth.guard';
import { UserInfoDto } from 'src/common/dto/userinfo.dto';
import { plainToInstance } from 'class-transformer';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.User.Search)
  async userSearch(
    @Query() { nickname }: UserSearchQueryRequestDto,
  ): Promise<UserSearchResponseDto> {
    const userInfos =
      await this.userService.getAccountInfosByNickname(nickname);
    return {
      userInfos: plainToInstance(UserInfoDto, userInfos, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
