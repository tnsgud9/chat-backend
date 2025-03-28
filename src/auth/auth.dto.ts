export class AuthLoginRequestDto {
  id: string;
  password: string;
}

export class AuthLoginResponseDto {
  nickname: string;
  accessToken: string;
}

export class AuthSignupRequestDto {
  id: string;
  password: string;
  nickname: string;
}

export class AuthSignupResponseDto {
  nickname: string;
  accessToken: string;
}
