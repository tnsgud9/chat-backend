import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule, // ConfigModule을 가져와서 ConfigService를 사용 가능하게 함
    DatabaseModule,
    AuthModule,
    UsersModule,
    ChatModule,
    JwtModule.register({ global: true }),
  ],
})
export class AppModule {}
