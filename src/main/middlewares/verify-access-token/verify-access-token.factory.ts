import { VerifyAccessTokenUseCase } from '@/application/verify-access-token/verify-access-token.use-case';
import { VerifyAccessTokenJwtAdapter } from '@/infra/verify-access-token/verify-access-token';

export function verifyAccessTokenFactory(): VerifyAccessTokenUseCase {
  const jwtAdapter = new VerifyAccessTokenJwtAdapter(process.env.JWT_SECRET!);
  return new VerifyAccessTokenUseCase(jwtAdapter);
}
