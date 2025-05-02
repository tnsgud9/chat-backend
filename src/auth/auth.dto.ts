import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자의 이메일 형식 아이디.',
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    example: 'Password1!',
    description: '대소문자, 숫자, 특수문자를 포함한 8~20자의 비밀번호.',
  })
  @IsString()
  @Length(8, 256)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/)
  password: string;
}

export class AuthLoginResponse {
  @ApiProperty({ example: 'user123', description: '사용자 닉네임.' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;

  @ApiProperty({
    example: 'jwt-access-token',
    description: 'JWT access_token 값. 쿠키에 저장됨.',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    example: '6634622fe3317b6025ff3fa3',
    description: 'MongoDB ObjectId 형식의 사용자 ID.',
  })
  @IsMongoId()
  id: string;

  @ApiProperty({
    example:
      '-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0B...\\n-----END PUBLIC KEY-----',
    description: 'PEM 방식의 공개키 값.',
  })
  @IsString()
  publicKey: string;

  @ApiProperty({
    example: 'rsaEncrypted:aesEncrypted',
    description:
      '하이브리드 암호화된 개인키. ":" 기준 앞은 RSA 암호문, 뒤는 AES 암호문. RSA 복호화 결과는 AES 키임.',
  })
  @IsString()
  encryptedPrivateKey: string;
}

export class AuthSignupRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자의 이메일 형식 아이디.',
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    example: 'Password1!',
    description: '대소문자, 숫자, 특수문자를 포함한 8~20자의 비밀번호.',
  })
  @IsString()
  @Length(8, 256)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/)
  password: string;

  @ApiProperty({ example: 'user123', description: '사용자 닉네임.' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;
}

export class AuthSignupResponse {
  @ApiProperty({ example: 'user123', description: '사용자 닉네임.' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;

  @ApiProperty({
    example: 'jwt-access-token',
    description: 'JWT access_token 값. 쿠키에 저장됨.',
  })
  accessToken: string;

  @ApiProperty({
    example: 'rsaEncrypted:aesEncrypted',
    description:
      '하이브리드 암호화된 개인키. ":" 기준 앞은 RSA 암호문, 뒤는 AES 암호문. RSA 복호화 결과는 AES 키임.',
  })
  encryptedPrivateKey: string;

  @ApiProperty({
    example:
      '-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0B...\\n-----END PUBLIC KEY-----',
    description: 'PEM 방식의 공개키 값.',
  })
  publicKey: string;
}
