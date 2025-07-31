import { SaveUser, SaveUserInput, SaveUserOutput } from '@/domain/save-user/save-user.protocol';
import { MongoClient } from 'mongodb';

export class SaveUserMongoAdapter implements SaveUser {
  constructor(private readonly client: MongoClient) {}

  async save(input: SaveUserInput): Promise<SaveUserOutput> {
    const { email, password } = input;

    const result = await this.client
      .db(process.env.MONGO_DB_NAME)
      .collection(process.env.MONGO_DB_COLLECTIONS!)
      .insertOne({ email, password });
    if (!result) throw new Error('Failed to save user');
    return {
      id: result.insertedId.toString(),
      email,
    };
  }
}
