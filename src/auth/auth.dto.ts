export type AuthLoginRequestDto = {
  id: string;
  password: string;
};

export type AuthLoginResponseDto = {
  nickname: string;
  accessToken: string;
};

export type AuthSignupRequestDto = {
  id: string;
  password: string;
  nickname: string;
};

export type AuthSignupResponseDto = {
  nickname: string;
  accessToken: string;
};
