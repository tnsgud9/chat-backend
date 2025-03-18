export type LoginRequestDto = {
  id: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
};
