import { CheckUserByEmailProtocol } from '@/domain/check-user-by-email/check-user-by-email.protocol';
import { EmailAlreadyExistsError } from '@/domain/errors';
import { HashPasswordProtocol } from '@/domain/hash-password/hash-password.protocol';
import { SaveUserProtocol } from '@/domain/save-user/save-user.protocol';
import { SignUpInput, SignUpOutput } from '@/domain/sing-up/sign-up.protocol';

export class SignUpUseCase {
  constructor(
    private readonly checkUserByEmail: CheckUserByEmailProtocol,
    private readonly hashPassword: HashPasswordProtocol,
    private readonly saveUser: SaveUserProtocol
  ) {}

  async execute(input: SignUpInput): Promise<SignUpOutput> {
    const emailInUse = await this.checkUserByEmail.check(input);
    if (emailInUse) throw new EmailAlreadyExistsError();
    const hashed = await this.hashPassword.hash({ password: input.password });
    const user = await this.saveUser.save({
      email: input.email,
      password: hashed.hash,
    });

    return user;
  }
}
