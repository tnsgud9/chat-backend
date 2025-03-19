import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Permission } from 'src/common/enums/permission.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  // dummyUser 데이터로 DB 연동시 제거 예정
  private readonly users: object[] = [
    {
      uid: uuidv4(),
      username: 'admin',
      password: '1234',
      nickname: 'GOD',
      permission: Permission.ADMIN,
    },
    {
      uid: uuidv4(),
      username: 'user',
      password: 'password',
      nickname: 'James',
      permission: Permission.USER,
    },
  ];

  // dummyUser에서 유효한 username과 password인지 확인하는 메서드
  public isValidCredentials(id: string, password: string): boolean {
    return this.users.some(
      (user) => user['username'] === id && user['password'] === password,
    );
  }

  public async createAccessToken(username: string): Promise<string> {
    return await this.jwtService.signAsync(
      { username: username },
      {
        expiresIn: '30d',
        secret: 'SECRETKEYSECRETKEYSECRETKEYSECRETKEY',
      },
    );
  }
  public async createRefreshToken(username: string): Promise<string> {
    return await this.jwtService.signAsync(
      { username: username },
      {
        expiresIn: '60s',
        secret: 'SECRETKEYSECRETKEYSECRETKEYSECRETKEY',
      },
    );
  }
}
