import { SignInInput, SignInOutput } from '@/domain/sign-in/sign-in.repository';
import { MongoClient } from 'mongodb';
export interface MongoDbAdapterRepository {
  findByUsername(input: SignInInput): Promise<SignInOutput>;
}

interface MongoUser {
  id: string;
  username: string;
}

export class MongoDbAdapter implements MongoDbAdapterRepository {
  constructor(private readonly client: MongoClient) {}
  async findByUsername(input: SignInInput): Promise<SignInOutput> {
    const username = input.username;
    const user = await this.client
      .db('test-db')
      .collection<MongoUser>('users')
      .findOne({ username }, { projection: { _id: 1, username: 1 } });
    if (!user) return null;
    return {
      id: user._id.toString(), // converte ObjectId para string
      username: user.username,
    };
  }
}
