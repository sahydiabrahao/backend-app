import { FastifyInstance } from 'fastify';
import { meController } from '@/main/features/me/me.controller';
import { verifyAccessTokenMiddleware } from '@/main/middlewares/verify-access-token/verify-access-token.middleware';
import { meSchema } from '@/main/features/me/me.schema';

export async function meRoutes(app: FastifyInstance) {
  app.post('/me', { preHandler: verifyAccessTokenMiddleware, schema: meSchema }, meController);
}
