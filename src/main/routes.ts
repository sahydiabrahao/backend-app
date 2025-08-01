import { FastifyInstance } from 'fastify';
import { signInRoutes } from './features/sign-in/sign-in.route';
import { meRoutes } from './features/me/me.route';
import { signUpRoutes } from './features/sign-up/sign-up.route';

export async function appRoutes(app: FastifyInstance) {
  await signInRoutes(app);
  await meRoutes(app);
  await signUpRoutes(app);
}
