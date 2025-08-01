import { FastifyInstance } from 'fastify';
import { signInRoutes } from './sign-in/sign-in.route';
import { meRoutes } from './me/me.route';
import { signUpRoutes } from './sign-up/sign-up.route';

export async function appRoutes(app: FastifyInstance) {
  await signInRoutes(app);
  await meRoutes(app);
  await signUpRoutes(app);
}
