import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken'; // 👈 agora o tipo existe

import {
  AccessTokenProtocol,
  AccessTokenInput,
  AccessTokenOutput,
} from '@/domain/access-token/access-token.protocol';

export class AccessTokenJwtAdapter implements AccessTokenProtocol {
  constructor(
    private readonly secret: string,
    private readonly defaultExpiresInMs: number = 3600
  ) {}

  async generate(input: AccessTokenInput): Promise<AccessTokenOutput> {
    const payload = { sub: input.key };

    const options: SignOptions = {
      expiresIn: this.defaultExpiresInMs,
    };

    const accessToken = jwt.sign(payload, this.secret, options);

    return { accessToken };
  }
}
