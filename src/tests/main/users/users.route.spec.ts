import { usersRoutes } from '@/main/users/users.route';
import Fastify from 'fastify';

jest.mock('@/main/middlewares/verify-access-token/verify-access-token.middleware', () => ({
  verifyAccessTokenMiddleware: (
    req: import('fastify').FastifyRequest & { userId?: string },
    _res: import('fastify').FastifyReply,
    done: () => void
  ) => {
    req.userId = 'mock-user-id';
    done();
  },
}));

describe('Users Routes', () => {
  const fastify = Fastify();

  beforeAll(async () => {
    await fastify.register(usersRoutes);
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return 200 and userId when authenticated', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/users',
      payload: {},
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ userId: 'mock-user-id' });
  });
});
