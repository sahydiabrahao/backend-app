import Fastify, { FastifyRequest, FastifyReply } from 'fastify';

const mockController = jest.fn(async (_req: FastifyRequest, reply: FastifyReply) => {
  return reply.status(201).send({ message: 'user created' });
});

jest.mock('@/main/sign-up/sign-up.controller', () => ({
  signUpController: mockController,
}));

import { signUpRoutes } from '@/main/sign-up/sign-up.route';

describe('signUpRoutes', () => {
  it('should register POST /sign-up and call the controller', async () => {
    const app = Fastify();
    await signUpRoutes(app);

    const res = await app.inject({
      method: 'POST',
      url: '/sign-up',
      payload: {
        email: 'any-email@mail.com',
        password: 'any-password',
      },
    });

    expect(res.statusCode).toBe(201);
    expect(res.json()).toEqual({ message: 'user created' });
    expect(mockController).toHaveBeenCalledTimes(1);
  });

  it('should return 400 if required body params are missing', async () => {
    const app = Fastify();
    await signUpRoutes(app);

    const res = await app.inject({
      method: 'POST',
      url: '/sign-up',
      body: {},
    });

    expect(res.statusCode).toBe(400);
  });
});
