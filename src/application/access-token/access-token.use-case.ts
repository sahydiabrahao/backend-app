import {
  AccessTokenProtocol,
  AccessTokenInput,
  AccessTokenOutput,
} from '@/domain/access-token/access-token.protocol';

export class AccessTokenUseCase implements AccessTokenProtocol {
  constructor(private readonly accessTokenAdapter: AccessTokenProtocol) {}

  async generate(input: AccessTokenInput): Promise<AccessTokenOutput> {
    const token = await this.accessTokenAdapter.generate(input);
    return token;
  }
}
