import { FastifyInstance } from 'fastify';
import { signInRoutes } from './sign-in/sign-in.route';

export async function appRoutes(app: FastifyInstance) {
  await signInRoutes(app);
}
