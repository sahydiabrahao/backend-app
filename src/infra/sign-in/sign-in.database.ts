import { SignInService, SignInInput, SignInOutput } from '@/domain/sign-in/sign-in.service';
import { MongoDbAdapterRepository } from '@/infra/database/mongo-db.adapter';

export class SignInDatabase implements SignInService {
  constructor(private readonly mongoDbAdapter: MongoDbAdapterRepository) {}

  async findByUsername(input: SignInInput): Promise<SignInOutput | null> {
    const output = await this.mongoDbAdapter.findByUsername(input);
    return output;
  }
}
