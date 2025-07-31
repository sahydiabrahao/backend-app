import { SignInProtocol, SignInInput, SignInOutput } from '@/domain/sign-in/sign-in.protocol';
import { FindUserByEmailProtocol } from '@/domain/find-user-by-email/find-user-by-email.protocol';
import { InvalidCredentialsError } from '@/domain/errors';
import { AccessTokenProtocol } from '@/domain/access-token/access-token.protocol';
import { ComparePasswordProtocol } from '@/domain/compare-password/compare-password.protocol';

export class SignInUseCase implements SignInProtocol {
  constructor(
    private readonly findUserByUsername: FindUserByEmailProtocol,
    private readonly accessToken: AccessTokenProtocol,
    private readonly comparePassword: ComparePasswordProtocol
  ) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.findUserByUsername.find({ email: input.email });
    if (!user) throw new InvalidCredentialsError();
    const isValidPassword = await this.comparePassword.compare({
      password: input.password,
      hashed: user.password,
    });
    if (!isValidPassword) throw new InvalidCredentialsError();
    const token = await this.accessToken.generate({ key: user.id });
    return {
      accessToken: token.accessToken,
      userId: user.id,
    };
  }
}
