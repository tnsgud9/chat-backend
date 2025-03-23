import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  config: Configuration;
  constructor(private configService: NestConfigService) {
    this.config = {
      DB_URI: process.env.DB_URI || 'localhost',
      PORT: parseInt(process.env.PORT || '27017'),
      SECRET_TOKEN: process.env.SECRET_TOKEN || 'secretsecretsecret',
    } as Configuration;
  }
}
