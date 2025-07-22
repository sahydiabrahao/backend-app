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
      .db(process.env.MONGO_DB_NAME)
      .collection<MongoUser>(process.env.MONGO_DB_COLLECTIONS!)
      .findOne({ username }, { projection: { _id: 1, username: 1 } });
    if (!user) return null;
    return {
      id: user._id.toString(),
      username: user.username,
    };
  }
}
