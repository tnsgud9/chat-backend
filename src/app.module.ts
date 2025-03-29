import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChatModule,
    DatabaseModule,
    ConfigModule, // ConfigModule을 가져와서 ConfigService를 사용 가능하게 함
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // MongooseModule에서 ConfigModule을 import
      inject: [ConfigService], // ConfigService를 주입
      useFactory: (configService: ConfigService) => ({
        uri: configService.config.DB_URI, // 환경 변수에서 DB 주소 사용
      }),
    }),
  ],
})
export class AppModule {}
