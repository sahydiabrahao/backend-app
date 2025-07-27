import {
  FindUserByUsernameProtocol,
  FindUserByUsernameInput,
  FindUserByUsernameOutput,
} from '@/domain/find-user-by-username/find-user-by-username.protocol';

export class FindUserByUsernameUseCase {
  constructor(private readonly findUserByUsername: FindUserByUsernameProtocol) {}

  async execute(input: FindUserByUsernameInput): Promise<FindUserByUsernameOutput | null> {
    return this.findUserByUsername.findByUsername(input);
  }
}
