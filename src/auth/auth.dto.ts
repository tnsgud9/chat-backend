export type AuthLoginRequestDto = {
  id: string;
  password: string;
};

export type AuthLoginResponseDto = {
  nickname: string;
  accessToken: string;
  refreshToken: string;
};
