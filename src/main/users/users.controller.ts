import { FastifyRequest, FastifyReply } from 'fastify';

export async function usersController(req: FastifyRequest, reply: FastifyReply) {
  const { userId } = req as FastifyRequest & { userId: string };

  return reply.status(200).send({ userId });
}
