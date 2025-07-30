import {
  VerifyAccessTokenProtocol,
  VerifyAccessTokenInput,
  VerifyAccessTokenOutput,
} from '@/domain/verify-access-token/verify-access-token.protocol';

export class VerifyAccessTokenUseCase {
  constructor(private readonly verifier: VerifyAccessTokenProtocol) {}

  async execute(input: VerifyAccessTokenInput): Promise<VerifyAccessTokenOutput> {
    return this.verifier.verify(input);
  }
}
