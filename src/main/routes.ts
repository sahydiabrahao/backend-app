import { FastifyInstance } from 'fastify';
import { signInRoutes } from './sign-in/sign-in.route';
import { usersRoutes } from './users/users.route';

export async function appRoutes(app: FastifyInstance) {
  await signInRoutes(app);
  await usersRoutes(app);
}
