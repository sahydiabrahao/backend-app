import { SignInRepository, SignInOutput, SignInInput } from '@/domain/sign-in/sign-in.repository';

export class SignInUseCase {
  constructor(private readonly signInRepository: SignInRepository) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.signInRepository.findByUsername(input);
    if (!user) throw new Error('Invalid credentials'); // ou 'User not found'
    return user;
  }
}
