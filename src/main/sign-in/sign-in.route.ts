import { FastifyInstance } from 'fastify';
import { signInController } from '@/main/sign-in/sign-in.controller';

export async function signInRoutes(app: FastifyInstance) {
  app.get('/sign-in', signInController);
}
