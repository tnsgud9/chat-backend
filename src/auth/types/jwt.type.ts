export type JwtPayload = {
  id: string;
  nickname: string;
};

export type AccessTokenPayload = {} & JwtPayload;
export type RefreshTokenPayload = {} & JwtPayload;
