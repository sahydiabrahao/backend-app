import { FastifyInstance } from 'fastify';
import { signUpSchema } from './sign-up.schema';
import { signUpController } from './sign-up.controller';

export async function signUpRoutes(app: FastifyInstance) {
  app.post('/sign-up', { schema: signUpSchema }, signUpController);
}
