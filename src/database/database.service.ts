import { Injectable, Scope, Inject, Global } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/common/types/jwt.type';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {
  uid: string | undefined;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.uid = (this.request.user as AccessTokenPayload).uid;
  }
  getModel<T>(modelClass: { new (...args: any[]): T }): Model<T> {
    const modelName = modelClass.name; // 타입이 명확해졌기 때문에 오류 없음
    return this.connection.model<T>(modelName);
  }

  async firstOrDefaultWithUserUid<T>(
    model: Model<T>,
    uid: string | undefined = undefined,
  ): Promise<T | null> {
    return await model.findOne({ uid: uid || this.uid }).exec();
  }
}
