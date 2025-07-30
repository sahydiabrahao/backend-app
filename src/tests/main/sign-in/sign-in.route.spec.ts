import Fastify, { FastifyRequest, FastifyReply } from 'fastify';

const mockController = jest.fn(async (_req: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send({ message: 'controller called' });
});

jest.mock('@/main/sign-in/sign-in.controller', () => ({
  signInController: mockController,
}));

import { signInRoutes } from '@/main/sign-in/sign-in.route';

describe('signInRoutes', () => {
  it('Should register GET /sign-in and call the controller', async () => {
    const app = Fastify();
    await signInRoutes(app);

    const res = await app.inject({
      method: 'POST',
      url: '/sign-in',
      body: {
        email: 'any-email',
        password: 'any-password',
      },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ message: 'controller called' });
    expect(mockController).toHaveBeenCalledTimes(1);
  });
  it('Should return 400 if required query params are missing', async () => {
    const app = Fastify();
    await signInRoutes(app);

    const res = await app.inject({
      method: 'POST',
      url: '/sign-in',
      query: {},
    });

    expect(res.statusCode).toBe(400);
  });
});
