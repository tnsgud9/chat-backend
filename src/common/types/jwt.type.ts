export type JwtPayload = {
  uid: string;
  nickname: string;
};

export type AccessTokenPayload = {} & JwtPayload;
