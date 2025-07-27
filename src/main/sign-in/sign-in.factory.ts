import { MongoClient } from 'mongodb';
import { FindUserByUsernameMongoAdapter } from '@/infra/find-user-by-username/find-user-by-username.mongo-adapter';
import { AccessTokenJwtAdapter } from '@/infra/access-token/access-token.jwt-adapter';
import { SignInUseCase } from '@/application/sign-in/sign-in.use-case';

export function signInFactory(): SignInUseCase {
  const mongoClient = new MongoClient(process.env.MONGO_URL!);
  const findUserByUsernameMongoAdapter = new FindUserByUsernameMongoAdapter(mongoClient);
  const accessTokenJwtAdapter = new AccessTokenJwtAdapter(process.env.JWT_SECRET!);
  const signInUseCase = new SignInUseCase(findUserByUsernameMongoAdapter, accessTokenJwtAdapter);
  return signInUseCase;
}
