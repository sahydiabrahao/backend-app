// src/infra/mongo/find-user-by-email.mongo-adapter.spec.ts

import { MongoClient } from 'mongodb';
import { FindUserByEmailInput } from '@/domain/find-user-by-email/find-user-by-email.protocol';
import dotenv from 'dotenv';
import { FindUserByUsernameMongoAdapter } from '@/infra/find-user-by-email/find-user-by-email.mongo-adapter';

dotenv.config();

describe('FindUserByUsernameMongoAdapter (integration)', () => {
  let client: MongoClient;
  let sut: FindUserByUsernameMongoAdapter;

  const DB_NAME = process.env.MONGO_DB_NAME!;
  const COLLECTION = process.env.MONGO_DB_COLLECTIONS!;

  const FAKE_INPUT: FindUserByEmailInput = {
    email: 'any-email',
  };

  const FAKE_USER = {
    id: 'any-id',
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
    await db.collection(COLLECTION).insertOne(FAKE_USER);
    sut = new FindUserByUsernameMongoAdapter(client);
  });

  afterAll(async () => {
    await client.db(DB_NAME).collection(COLLECTION).deleteMany({});
    await client.close();
  });

  it('should return user with id, email and password if found', async () => {
    const result = await sut.findByEmail(FAKE_INPUT);

    expect(result?.id).toBeTruthy();
    expect(result?.email).toEqual('any-email');
  });

  it('should return null if user is not found', async () => {
    const result = await sut.findByEmail({ email: 'invalid-email' });

    expect(result).toBeNull();
  });
});
