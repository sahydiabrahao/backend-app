import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

export async function buildServer() {
  const app = Fastify();

  await app.register(cors, {
    origin: '*', // or['http://localhost:3000', 'https://mysite.com']
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], //
  });

  await app.register(appRoutes);

  return app;
}
