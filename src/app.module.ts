import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ChatModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env' + process.env.NODE_ENV,
    }),
    // MongooseModule.forRoot('mongodb://localhost:27017'),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
