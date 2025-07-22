import { SignInRepository, SignInOutput, SignInInput } from '@/domain/sign-in/sign-in.repository';

export class SignInUseCase {
  constructor(private readonly signInRepository: SignInRepository) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.signInRepository.findByUsername(input);

    return user;
  }
}
