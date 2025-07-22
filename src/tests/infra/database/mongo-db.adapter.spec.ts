import { MongoClient } from 'mongodb';
import { MongoDbAdapter } from '@/infra/database/mongo-db.adapter';
import dotenv from 'dotenv';

dotenv.config();
describe('MongoDbAdapter (integration)', () => {
  let client: MongoClient;
  let sut: MongoDbAdapter;

  beforeAll(async () => {
    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
  });

  beforeEach(async () => {
    const db = client.db(process.env.MONGO_DB_NAME!);
    await db.collection(process.env.MONGO_DB_COLLECTIONS!).deleteMany({});
    sut = new MongoDbAdapter(client);
  });

  afterAll(async () => {
    await client
      .db(process.env.MONGO_DB_NAME!)
      .collection(process.env.MONGO_DB_COLLECTIONS!)
      .deleteMany({});
    await client.close();
  });

  test('Should return user data if user exists in Mongo', async () => {
    const db = client.db(process.env.MONGO_DB_NAME!);
    await db.collection(process.env.MONGO_DB_COLLECTIONS!).insertOne({
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
