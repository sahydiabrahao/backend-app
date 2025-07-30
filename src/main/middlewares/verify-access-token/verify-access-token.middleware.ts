import { FastifyRequest } from 'fastify';
import { MissingTokenError } from '@/domain/errors';
import { verifyAccessTokenFactory } from '@/main/middlewares/verify-access-token/verify-access-token.factory';

interface AuthenticatedRequest extends FastifyRequest {
  userId: string;
}

export async function verifyAccessTokenMiddleware(req: FastifyRequest) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');

  if (!token) throw new MissingTokenError();

  const { userId } = await verifyAccessTokenFactory().execute({ token });
  (req as AuthenticatedRequest).userId = userId;
}
