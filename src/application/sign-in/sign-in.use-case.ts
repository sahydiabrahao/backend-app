import { SignInProtocol, SignInInput, SignInOutput } from '@/domain/sign-in/sign-in.protocol';
import { FindUserByUsernameProtocol } from '@/domain/find-user-by-username/find-user-by-username.protocol';
import { InvalidCredentialsError } from '@/domain/errors';
import { AccessTokenProtocol } from '@/domain/access-token/access-token.protocol';
import { ComparePasswordProtocol } from '@/domain/compare-password/compare-password.protocol';

export class SignInUseCase implements SignInProtocol {
  constructor(
    private readonly findUserByUsername: FindUserByUsernameProtocol,
    private readonly accessToken: AccessTokenProtocol,
    private readonly comparePassword: ComparePasswordProtocol
  ) {}

  async signIn(input: SignInInput): Promise<SignInOutput> {
    const user = await this.findUserByUsername.findByUsername({ username: input.username });
    if (!user) throw new InvalidCredentialsError();
    const isValidPassowrd = await this.comparePassword.compare({
      password: input.password,
      hashed: user.password,
    });
    if (!isValidPassowrd) throw new InvalidCredentialsError();
    const token = await this.accessToken.generate({ key: user.id });
    return {
      accessToken: token.accessToken,
      userId: user.id,
    };
  }
}
