import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthAccessTokenGuard, AuthRefreshTokenGuard } from './auth.guard';
import {
  AuthAccessTokenStrategy,
  AuthRefreshTokenStrategy,
} from './auth.strategy';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthAccessTokenGuard,
    AuthRefreshTokenGuard,
    AuthAccessTokenStrategy,
    AuthRefreshTokenStrategy,
  ],
})
export class AuthModule {}
