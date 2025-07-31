import {
  FindUserByEmailProtocol,
  FindUserByEmailInput,
  FindUserByEmailOutput,
} from '@/domain/find-user-by-email/find-user-by-email.protocol';

export class FindUserByUsernameUseCase {
  constructor(private readonly findUserByEmail: FindUserByEmailProtocol) {}

  async execute(input: FindUserByEmailInput): Promise<FindUserByEmailOutput | null> {
    return this.findUserByEmail.find(input);
  }
}
