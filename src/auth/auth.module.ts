import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthAccessTokenGuard } from './auth.guard';
import { AuthAccessTokenStrategy } from './auth.strategy';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthAccessTokenGuard, AuthAccessTokenStrategy],
})
export class AuthModule {}
