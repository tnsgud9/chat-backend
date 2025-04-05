import { Injectable, Scope, Inject } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/common/types/jwt.type';
import { InjectConnection } from '@nestjs/mongoose';
import { Schemas } from './schema';

@Injectable({ scope: Scope.REQUEST })
export class DatabaseService {
  uid: string | undefined;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.uid = (this.request.user as AccessTokenPayload | undefined)?.uid;
  }

  getModel<T>(schema: (typeof Schemas)[keyof typeof Schemas]): Model<T> {
    return this.connection.model<T>(schema.name);
  }

  async firstOrDefaultWithUid<T>(
    model: Model<T>,
    uid: string | undefined = undefined,
  ): Promise<T | null> {
    return await model.findOne({ uid: uid || this.uid }).exec();
  }
}
