import { SignInRepository, SignInOutput, SignInInput } from '@/domain/sign-in/sign-in.repository';
import { InvalidCredentialsError, MissingParamsError } from '@/domain/errors';

export class SignInUseCase {
  constructor(private readonly signInRepository: SignInRepository) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    if (!input || Object.values(input).length === 0) throw new MissingParamsError();
    const user = await this.signInRepository.findByUsername(input);
    if (!user || user.password !== input.password) throw new InvalidCredentialsError();
    return user;
  }
}
