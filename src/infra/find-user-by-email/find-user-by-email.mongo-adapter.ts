// src/infra/mongo/find-user-by-email.mongo-adapter.ts

import {
  FindUserByEmailProtocol,
  FindUserByEmailInput,
  FindUserByEmailOutput,
} from '@/domain/find-user-by-email/find-user-by-email.protocol';
import { MongoClient } from 'mongodb';

export class FindUserByUsernameMongoAdapter implements FindUserByEmailProtocol {
  constructor(private readonly client: MongoClient) {}
  async find(input: FindUserByEmailInput): Promise<FindUserByEmailOutput | null> {
    const email = input.email;

    const user = await this.client
      .db(process.env.MONGO_DB_NAME)
      .collection<FindUserByEmailOutput>(process.env.MONGO_DB_COLLECTIONS!)
      .findOne({ email }, { projection: { _id: 1, email: 1, password: 1 } });

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
    };
  }
}
