import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../common/types/jwt.type';

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
