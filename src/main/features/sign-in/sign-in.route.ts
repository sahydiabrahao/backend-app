import { FastifyInstance } from 'fastify';
import { signInController } from '@/main/features/sign-in/sign-in.controller';
import { signInSchema } from '@/main/features/sign-in/sign-in.schema';

export async function signInRoutes(app: FastifyInstance) {
  app.post('/sign-in', { schema: signInSchema }, signInController);
}
