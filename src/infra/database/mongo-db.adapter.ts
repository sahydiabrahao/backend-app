import { SignInInput, SignInOutput } from '@/domain/sign-in/sign-in.repository';

export interface MongoDbAdapter {
  findByUsername(input: SignInInput): Promise<SignInOutput | null>;
}
