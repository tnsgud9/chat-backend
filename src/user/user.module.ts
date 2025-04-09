import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthAccessTokenGuard } from 'src/auth/auth.guard';
import { AuthAccessTokenStrategy } from 'src/auth/auth.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthAccessTokenGuard, AuthAccessTokenStrategy],
})
export class UsersModule {}
