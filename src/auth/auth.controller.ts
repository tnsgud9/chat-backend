import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthSignupRequestDto,
  AuthSignupResponseDto,
} from './auth.dto';
import { Response } from 'express';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ApiRoutes.Auth.LOGIN)
  async authLogin(
    @Body() body: AuthLoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    // 대충 로그인 유효성을 검증하는 코드
    const { id, password } = body;

    const authEntity = this.authService.getAccount(id, password);
    if (authEntity === undefined) {
      // 로그인 실패 응답
      return res.status(401);
    }

    // 로그인 성공 시 처리
    const accessToken = await this.authService.createAccessToken({
      id: id,
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

  @Post(ApiRoutes.Auth.SIGNUP)
  async authSignup(
    @Res() res: Response,
    @Body() { id, nickname }: AuthSignupRequestDto,
  ): Promise<Response> {
    const accessToken = await this.authService.createAccessToken({
      id: id,
      nickname: nickname,
    });

    return res.status(200).json({
      accessToken: accessToken,
      nickname: nickname,
    } as AuthSignupResponseDto);
  }

  @Post(ApiRoutes.Auth.LOGOUT)
  authLogout(@Res() res: Response) {
    // 쿠키 토큰 삭제
    res.clearCookie('access_token');
    return res.status(200);
  }
}
