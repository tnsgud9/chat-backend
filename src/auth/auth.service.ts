import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Permission } from 'src/common/enums/permission.enum';
import { v4 as uuidv4 } from 'uuid';
import { Auth, AuthDocument, AuthSchema } from '../database/schema/auth.schema';
import { AccessTokenPayload } from '../common/types/jwt.type';
import { ConfigService } from 'src/config/config.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private databaseService: DatabaseService,
  ) {}

  // dummyUser에서 유효한 username과 password인지 확인하는 메서드
  public async getAccount(
    username: string,
    password: string,
  ): Promise<AuthDocument | null> {
    const authEntity = this.databaseService.getModel(Auth);
    return await authEntity.findOne({ username, password }).exec();
  }

  // public isValidCredentials(id: string, password: string): boolean {
  //   return this.users.some(
  //     (user) => user['username'] === id && user['password'] === password,
  //   );
  // }

  public async createAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.config.SECRET_TOKEN,
    });
  }
}
