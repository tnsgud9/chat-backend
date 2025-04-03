import { Body, Controller, Post, Res } from '@nestjs/common';
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

  @Post(ApiRoutes.Auth.Login)
  async authLogin(
    @Body() { id, password }: AuthLoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    const authEntity = await this.authService.getAccount(id, password);

    // 계정이 유효하지 않은 경우
    if (authEntity === null) {
      // 로그인 실패 응답
      return res.status(401).end();
    }

    // 계정이 유효한 경우 access token 발급
    const accessToken = await this.authService.createAccessToken({
      uid: id,
      nickname: authEntity.nickname,
    });

    // 쿠키에 토큰 저장
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('access_token', accessToken, { httpOnly: true });
    // 로그인 성공 응답
    return res
      .status(200) // 상태코드 지정
      .json({
        accessToken: accessToken,
      } as AuthLoginResponseDto);
  }

  @Post(ApiRoutes.Auth.Signup)
  async authSignup(
    @Res() res: Response,
    @Body() { id, password, nickname }: AuthSignupRequestDto,
  ): Promise<Response> {
    const authEntity = this.authService.getAccount(id, password);

    // 계정이 존재하는 경우
    if (authEntity !== undefined) {
      // 로그인 실패 응답
      return res.status(401);
    }

    // 계정이 없는 경우 가입 진행
    // access token 발급
    const accessToken = await this.authService.createAccessToken({
      uid: id,
      nickname: nickname,
    });

    return res.status(200).json({
      accessToken: accessToken,
      nickname: nickname,
    } as AuthSignupResponseDto);
  }

  @Post(ApiRoutes.Auth.Logout)
  authLogout(@Res() res: Response) {
    // 쿠키 토큰 삭제
    res.clearCookie('access_token');
    return res.status(200);
  }
}
