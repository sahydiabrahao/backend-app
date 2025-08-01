import { MongoClient } from 'mongodb';
import { CheckUserByEmailUseCase } from '@/application/check-user-by-email/check-user-by-email.use-case';
import { HashPasswordBcryptAdapter } from '@/infra/hash-password/hash-password.bcrypt-adapter';
import { SaveUserMongoAdapter } from '@/infra/save-user/save-user.mongo-adapter';
import { FindUserByUsernameMongoAdapter } from '@/infra/find-user-by-email/find-user-by-email.mongo-adapter';
import { SignUpUseCase } from '@/application/sign-up/sign-up.use-case';

export function signUpFactory(): SignUpUseCase {
  const mongoClient = new MongoClient(process.env.MONGO_URL!);

  const findUserByEmailAdapter = new FindUserByUsernameMongoAdapter(mongoClient);
  const checkUserByEmailUseCase = new CheckUserByEmailUseCase(findUserByEmailAdapter);
  const hashPasswordAdapter = new HashPasswordBcryptAdapter();
  const saveUserAdapter = new SaveUserMongoAdapter(mongoClient);

  const signUpUseCase = new SignUpUseCase(
    checkUserByEmailUseCase,
    hashPasswordAdapter,
    saveUserAdapter
  );

  return signUpUseCase;
}
