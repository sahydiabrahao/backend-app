import { FastifyInstance } from 'fastify';
import { usersController } from '@/main/users/users.controller';
import { verifyAccessTokenMiddleware } from '@/main/middlewares/verify-access-token/verify-access-token.middleware';
import { usersSchema } from '@/main/users/users.schema';

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    { preHandler: verifyAccessTokenMiddleware, schema: usersSchema },
    usersController
  );
}
