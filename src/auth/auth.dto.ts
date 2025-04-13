import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';

export class AuthLoginRequestDto {
  @IsEmail()
  username: string;

  @IsString()
  @Length(8, 256)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/)
  password: string;
}

export class AuthLoginResponseDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;

  @IsString()
  accessToken: string;

  @IsMongoId()
  id: Types.ObjectId;

  @IsString()
  publicKey: string;

  @IsString()
  encryptedPrivateKey: string;
}

export class AuthSignupRequestDto {
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

export class AuthSignupResponseDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  nickname: string;

  accessToken: string;

  encryptedPrivateKey: string;

  publicKey: string;
}
