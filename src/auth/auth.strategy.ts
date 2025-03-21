import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload, RefreshTokenPayload } from './types/jwt.type';

@Injectable()
export class AuthAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access_token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRETKEYSECRETKEYSECRETKEYSECRETKEY',
      // passReqToCallback: true,
    });
  }
  validate(payload: AccessTokenPayload) {
    return payload;
  }
}

@Injectable()
export class AuthRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRETKEYSECRETKEYSECRETKEYSECRETKEY',
      passReqToCallback: true,
    });
  }
  validate(payload: RefreshTokenPayload) {
    return payload;
  }
}
