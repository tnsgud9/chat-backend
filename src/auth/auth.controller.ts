import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { AuthService } from './auth.service';
import {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthSignupRequestDto,
  AuthSignupResponseDto,
} from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 로그인 API
  @Post(ApiRoutes.Auth.Login)
  async authLogin(
    @Body() authLoginDto: AuthLoginRequestDto,
  ): Promise<AuthLoginResponseDto> {
    const { username, password } = authLoginDto;

    const authEntity = await this.authService.getAccount(username, password);
    if (!authEntity) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
    }

    const accessToken = await this.authService.createAccessToken({
      uid: username,
      nickname: authEntity.nickname,
    });

    return { accessToken, nickname: authEntity.nickname };
  }

  @Post(ApiRoutes.Auth.Signup)
  async authSignup(
    @Body() authSignupDto: AuthSignupRequestDto,
  ): Promise<AuthSignupResponseDto> {
    const { username, password, nickname } = authSignupDto;

    const existingUser = await this.authService.getAccount(username, password);
    if (existingUser !== null) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }

    const newUser = await this.authService.createAccount(
      username,
      password,
      nickname,
    );
    if (!newUser) {
      throw new InternalServerErrorException('회원가입에 실패했습니다.');
    }

    const accessToken = await this.authService.createAccessToken({
      uid: newUser._id,
      nickname: newUser.nickname,
    });

    return { accessToken, nickname: newUser.nickname };
  }

  // 로그아웃 API
  @Post(ApiRoutes.Auth.Logout)
  authLogout(@Res() res: Response) {
    // 쿠키에 저장된 access_token 삭제
    res.clearCookie('access_token');
    return res.status(200).json({ message: '로그아웃 되었습니다.' });
  }
}
