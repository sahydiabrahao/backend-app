import { usersController } from '@/main/users/users.controller';
import { FastifyRequest, FastifyReply } from 'fastify';

describe('usersController', () => {
  it('should return 200 with userId', async () => {
    const mockRequest = {
      userId: '123456',
    } as FastifyRequest & { userId: string };

    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const mockReply = {
      status,
    } as unknown as FastifyReply;

    await usersController(mockRequest, mockReply);

    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith({ userId: '123456' });
  });
});
