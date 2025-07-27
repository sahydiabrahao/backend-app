// src/infra/mongo/find-user-by-username.mongo-adapter.ts

import {
  FindUserByUsernameProtocol,
  FindUserByUsernameInput,
  FindUserByUsernameOutput,
} from '@/domain/find-user-by-username/find-user-by-username.protocol';
import { MongoClient } from 'mongodb';

export class FindUserByUsernameMongoAdapter implements FindUserByUsernameProtocol {
  constructor(private readonly client: MongoClient) {}
  async findByUsername(input: FindUserByUsernameInput): Promise<FindUserByUsernameOutput | null> {
    const username = input.username;

    const user = await this.client
      .db(process.env.MONGO_DB_NAME)
      .collection<FindUserByUsernameOutput>(process.env.MONGO_DB_COLLECTIONS!)
      .findOne({ username }, { projection: { _id: 1, username: 1, password: 1 } });

    if (!user) return null;

    return {
      id: user._id.toString(),
      username: user.username,
      password: user.password,
    };
  }
}
