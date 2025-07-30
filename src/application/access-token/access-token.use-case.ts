import {
  AccessTokenProtocol,
  AccessTokenInput,
  AccessTokenOutput,
} from '@/domain/access-token/access-token.protocol';

export class AccessTokenUseCase {
  constructor(private readonly accessTokenAdapter: AccessTokenProtocol) {}

  async execute(input: AccessTokenInput): Promise<AccessTokenOutput> {
    const token = await this.accessTokenAdapter.generate(input);
    return token;
  }
}
