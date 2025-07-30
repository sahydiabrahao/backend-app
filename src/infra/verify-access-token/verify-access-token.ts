import jwt from 'jsonwebtoken';
import {
  VerifyAccessTokenProtocol,
  VerifyAccessTokenInput,
  VerifyAccessTokenOutput,
} from '@/domain/verify-access-token/verify-access-token.protocol';

export class VerifyAccessTokenJwtAdapter implements VerifyAccessTokenProtocol {
  constructor(private readonly secret: string) {}

  async verify(input: VerifyAccessTokenInput): Promise<VerifyAccessTokenOutput> {
    const decoded = jwt.verify(input.token, this.secret) as { sub: string };
    return { userId: decoded.sub };
  }
}
