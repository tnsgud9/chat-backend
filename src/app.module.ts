import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { join } from 'path';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.config.DB_URI,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([
      {
        useFactory: async () => {
          const SCHEMA_FOLDER = '../database/schema'; // 스키마 폴더 경로
          const schemas: { [key: string]: mongoose.Schema } = {};
          const files = readdirSync(SCHEMA_FOLDER);

          // 파일을 비동기적으로 읽고, mongoose.Schema 객체로 변환
          for (const file of files) {
            if (file.endsWith('.ts')) {
              const filePath = join(SCHEMA_FOLDER, file);
              const { default: schema } = await import(filePath);
              const fileName = file.replace('.ts', ''); // 파일명에서 확장자 제거

              if (schema instanceof mongoose.Schema) {
                schemas[fileName] = schema;
              }
            }
          }

          // 반환하는 값은 MongooseModule.forFeature에 맞는 형태로 변환된 스키마들
          return Object.entries(schemas).map(([name, schema]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1), // 첫 글자를 대문자로 변환
            schema,
          }));
        },
        name: '',
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
