export type LoginRequestDto = {
  id: string;
  password: string;
};

export type LoginResponseDto = {
  nickname: string;
  accessToken: string;
  refreshToken: string;
};
