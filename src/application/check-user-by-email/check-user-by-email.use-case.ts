import {
  CheckUserByEmailInput,
  CheckUserByEmailOutput,
} from '@/domain/check-user-by-email/check-user-by-email.protocol';
import { FindUserByEmailProtocol } from '@/domain/find-user-by-email/find-user-by-email.protocol';

export class CheckUserByEmailUseCase {
  constructor(private readonly findUserByEmail: FindUserByEmailProtocol) {}

  async execute(input: CheckUserByEmailInput): Promise<CheckUserByEmailOutput> {
    const user = await this.findUserByEmail.find({ email: input.email });
    if (!user) return false;
    return true;
  }
  async check(input: CheckUserByEmailInput): Promise<CheckUserByEmailOutput> {
    return this.execute(input);
  }
}
