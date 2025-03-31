import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  config: Configuration;
  constructor(private configService: NestConfigService) {
    this.config = {
      DB_URI: this.configService.get('DB_URI', 'localhost'),
      PORT: this.configService.get<number>('PORT', 3000),
      SECRET_TOKEN: this.configService.get(
        'SECRET_TOKEN',
        'secretsecretsecret',
      ),
    } as Configuration;
  }
}
