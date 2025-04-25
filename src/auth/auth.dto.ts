import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class AuthLoginRequest {
  @IsEmail()
  username: string;

  @IsString()
  @Length(8, 256)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/)
  password: string;
}

export class AuthLoginResponse {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;

  @IsString()
  accessToken: string;

  @IsMongoId()
  id: string;

  @IsString()
  publicKey: string;

  @IsString()
  encryptedPrivateKey: string;
}

export class AuthSignupRequest {
  @IsEmail()
  username: string;

  @IsString()
  @Length(8, 256)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;
}

export class AuthSignupResponse {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;

  accessToken: string;

  encryptedPrivateKey: string;

  publicKey: string;
}
