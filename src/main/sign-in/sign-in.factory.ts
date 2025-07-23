import { SignInUseCase } from '@/application/sign-in/sign-in.use-case';
import { SignInDatabase } from '@/infra/sign-in/sign-in.database';
import { MongoDbAdapter } from '@/infra/database/mongo-db.adapter';
import { MongoClient } from 'mongodb';

export function signInFactory(): SignInUseCase {
  const mongoClient = new MongoClient(process.env.MONGO_URL!);
  const mongoDbAdapter = new MongoDbAdapter(mongoClient);
  const signInDatabase = new SignInDatabase(mongoDbAdapter);
  const findUserByExternalId = new SignInUseCase(signInDatabase);
  return findUserByExternalId;
}
