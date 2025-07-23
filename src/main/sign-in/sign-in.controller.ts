import { FastifyRequest, FastifyReply } from 'fastify';
import { signInFactory } from './sign-in.factory';
import { SignInInput } from '@/domain/sign-in/sign-in.repository';

export async function signInController(
  req: FastifyRequest<{ Querystring: SignInInput }>,
  reply: FastifyReply
) {
  const input = req.query;

  if (!input || Object.values(input).length === 0)
    return reply.status(400).send({ error: 'Missing params error' });

  const signInUseCase = signInFactory();

  try {
    const user = await signInUseCase.execute(input);
    return reply.send(user);
  } catch {
    return reply.status(404).send({ error: 'Invalid credentials' });
  }
}
