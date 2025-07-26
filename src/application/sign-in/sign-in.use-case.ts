import { SignInService, SignInOutput, SignInInput } from '@/domain/sign-in/sign-in.service';
import { InvalidCredentialsError, MissingParamsError } from '@/domain/errors';

export class SignInUseCase {
  constructor(private readonly signInRepository: SignInService) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    if (!input || Object.values(input).length === 0) throw new MissingParamsError();
    const output = await this.signInRepository.findByUsername(input);
    if (!output || output.password !== input.password) throw new InvalidCredentialsError();
    return output;
  }
}
