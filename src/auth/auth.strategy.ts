import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access_token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.config.SECRET_TOKEN,
      // passReqToCallback: true,
    });
  }
  validate(payload: AccessTokenPayload) {
    return payload;
  }
}
