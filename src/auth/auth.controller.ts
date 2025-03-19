import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto } from './auth.dto';
import { Response } from 'express';
import { ApiRoutes } from 'src/common/constants/api-routes';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ApiRoutes.Auth.LOGIN)
  async AuthLogin(
    @Body() body: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    // 대충 로그인 유효성을 검증하는 코드
    const { id, password } = body;
    if (!this.authService.isValidCredentials(id, password)) {
      // 로그인 실패 응답
      return res.status(401);
    }

    // 로그인 성공 시 처리
    const accessToken = await this.authService.createAccessToken(id);
    const refreshToken = await this.authService.createRefreshToken(id);

    // 쿠키에 토큰 저장
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    // 로그인 성공 응답
    return res
      .status(200) // 상태코드 지정
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      } as LoginResponseDto);
  }

  @Get(ApiRoutes.Auth.SIGNUP)
  AuthSignup() {
    return 'asd';
  }

  @Post(ApiRoutes.Auth.REFRESH)
  async AuthRefresh() {
    const accessToken = await this.authService.createAccessToken(id);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('access_token', accessToken, { httpOnly: true });
  }

  @Post(ApiRoutes.Auth.LOGOUT)
  async AuthLogout() {}
}
