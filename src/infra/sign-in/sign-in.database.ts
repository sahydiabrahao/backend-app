import { SignInRepository, SignInInput, SignInOutput } from '@/domain/sign-in/sign-in.repository';
import { MongoDbAdapter } from '@/infra/database/mongo-db.adapter';

export class SignInDatabase implements SignInRepository {
  constructor(private readonly mongoDbAdapter: MongoDbAdapter) {}

  async findByUsername(input: SignInInput): Promise<SignInOutput | null> {
    const result = await this.mongoDbAdapter.findByUsername(input);
    return result;
  }
}
