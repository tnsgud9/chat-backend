import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { AuthAccessTokenGuard } from 'src/auth/auth.guard';
import { AuthAccessTokenStrategy } from 'src/auth/auth.strategy';

@Module({
  controllers: [UsersController],
  providers: [UserService, AuthAccessTokenGuard, AuthAccessTokenStrategy],
})
export class UsersModule {}
