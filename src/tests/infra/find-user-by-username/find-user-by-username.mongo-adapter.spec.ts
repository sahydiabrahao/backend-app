// src/infra/mongo/find-user-by-username.mongo-adapter.spec.ts

import { MongoClient } from 'mongodb';
import { FindUserByUsernameInput } from '@/domain/find-user-by-username/find-user-by-username.protocol';
import dotenv from 'dotenv';
import { FindUserByUsernameMongoAdapter } from '@/infra/find-user-by-username/find-user-by-username.mongo-adapter';

dotenv.config();

describe('FindUserByUsernameMongoAdapter (integration)', () => {
  let client: MongoClient;
  let sut: FindUserByUsernameMongoAdapter;

  const DB_NAME = process.env.MONGO_DB_NAME!;
  const COLLECTION = process.env.MONGO_DB_COLLECTIONS!;

  const FAKE_INPUT: FindUserByUsernameInput = {
    username: 'any-username',
  };

  const FAKE_USER = {
    id: 'any-id',
    username: 'any-username',
    password: 'hashed-password',
  };

  beforeAll(async () => {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
  });

  beforeEach(async () => {
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION).deleteMany({});
    await db.collection(COLLECTION).insertOne(FAKE_USER);
    sut = new FindUserByUsernameMongoAdapter(client);
  });

  afterAll(async () => {
    await client.db(DB_NAME).collection(COLLECTION).deleteMany({});
    await client.close();
  });

  it('should return user with id, username and password if found', async () => {
    const result = await sut.findByUsername(FAKE_INPUT);

    expect(result?.id).toBeTruthy();
    expect(result?.username).toEqual('any-username');
  });

  it('should return null if user is not found', async () => {
    const result = await sut.findByUsername({ username: 'invalid-username' });

    expect(result).toBeNull();
  });
});
