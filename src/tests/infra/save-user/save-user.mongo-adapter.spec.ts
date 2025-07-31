// src/infra/mongo/save-user.mongo-adapter.spec.ts

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { SaveUserInput } from '@/domain/save-user/save-user.protocol';
import { SaveUserMongoAdapter } from '@/infra/save-user/save-user.mongo-adapter';

dotenv.config();

describe('SaveUserMongoAdapter (integration)', () => {
  let client: MongoClient;
  let sut: SaveUserMongoAdapter;

  const DB_NAME = process.env.MONGO_DB_NAME!;
  const COLLECTION = process.env.MONGO_DB_COLLECTIONS!;

  const FAKE_INPUT: SaveUserInput = {
    email: 'any-email',
    password: 'hashed-password',
  };

  beforeAll(async () => {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
  });

  beforeEach(async () => {
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION).deleteMany({});
    sut = new SaveUserMongoAdapter(client);
  });

  afterAll(async () => {
    await client.db(DB_NAME).collection(COLLECTION).deleteMany({});
    await client.close();
  });

  it('should return user with id and email on success', async () => {
    const result = await sut.save(FAKE_INPUT);

    expect(result?.id).toBeTruthy();
    expect(result?.email).toEqual('any-email');
  });

  it('should throw if MongoClient throws', async () => {
    const mockClient = {
      db: () => ({
        collection: () => ({
          insertOne: () => {
            throw new Error('forced_error');
          },
        }),
      }),
    } as unknown as MongoClient;

    const sut = new SaveUserMongoAdapter(mockClient);

    await expect(sut.save(FAKE_INPUT)).rejects.toThrow('forced_error');
  });
});
