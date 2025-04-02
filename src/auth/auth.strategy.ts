import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { ConfigService } from 'src/config/config.service';
import { Request } from 'express';

@Injectable()
export class AuthAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access_token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          if (!req || !req.cookies) {
            return null;
          }
          const token: unknown = req.cookies.access_token;
          return typeof token === 'string' ? token : null;
        },
      ]),
      secretOrKey: configService.config.SECRET_TOKEN,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: AccessTokenPayload) {
    req.user = payload;
    return payload;
  }
}
