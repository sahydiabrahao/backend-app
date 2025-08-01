import { meRoutes } from '@/main/features/me/me.route';
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

describe('me Routes', () => {
  const fastify = Fastify();

  beforeAll(async () => {
    await fastify.register(meRoutes);
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return 200 when authenticated', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/me',
      payload: {},
    });

    expect(response.statusCode).toBe(200);
  });
});
