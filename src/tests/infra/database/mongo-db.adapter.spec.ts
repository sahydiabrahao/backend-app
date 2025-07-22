import { MongoClient } from 'mongodb';
import { MongoDbAdapter } from '@/infra/database/mongo-db.adapter';

describe('MongoDbAdapter (integration)', () => {
  let client: MongoClient;
  let sut: MongoDbAdapter;

  const MONGO_URL = 'mongodb://localhost:27017';
  const DB_NAME = 'test-db';
  const COLLECTION = 'users';

  beforeAll(async () => {
    client = new MongoClient(MONGO_URL);
    await client.connect();
  });

  beforeEach(async () => {
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION).deleteMany({});
    sut = new MongoDbAdapter(client);
  });

  afterAll(async () => {
    await client.db(DB_NAME).collection(COLLECTION).deleteMany({});
    await client.close();
  });

  test('Should return user data if user exists in Mongo', async () => {
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION).insertOne({
      username: 'fake-username',
    });

    const result = await sut.findByUsername({
      username: 'fake-username',
      password: 'fake-password',
    });

    expect(result?.id).toBeTruthy();
    expect(result?.username).toEqual('fake-username');
  });
  test('Should return null if user does not exist in Mongo', async () => {
    const result = await sut.findByUsername({
      username: 'fake-username',
      password: 'fake-password',
    });

    expect(result).toBeNull();
  });
});
