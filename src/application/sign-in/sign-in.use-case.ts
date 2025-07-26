import { SignInRepository, SignInOutput, SignInInput } from '@/domain/sign-in/sign-in.repository';

export class SignInUseCase {
  constructor(private readonly signInRepository: SignInRepository) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.signInRepository.findByUsername(input);
    if (!user || user.password !== input.password) throw new Error('Invalid credentials');
    return user;
  }
}
