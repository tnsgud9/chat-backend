import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { UserSearchQueryRequestDto, UserSearchResponseDto } from './user.dto';
import { DatabaseService } from 'src/database/database.service';
import { AuthInfo } from '../auth/auth.decorator';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { AuthAccessTokenGuard } from '../auth/auth.guard';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
  ) {}
  @UseGuards(AuthAccessTokenGuard)
  @Get(ApiRoutes.User.Search)
  async userSearch(
    @Query() { nickname }: UserSearchQueryRequestDto,
    @AuthInfo() { id }: AccessTokenPayload,
  ): Promise<UserSearchResponseDto> {
    const user = await this.userService.getAccountInfo(nickname);
    if (!user || user.id == id) {
      throw new NotFoundException('존재하는 않거나 없는 계정입니다.');
    }
    return { id: user.id, nickname: user.nickname, publicKey: user.publicKey };
  }
}
