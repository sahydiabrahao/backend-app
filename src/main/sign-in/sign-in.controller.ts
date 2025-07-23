import { FastifyRequest, FastifyReply } from 'fastify';
import { signInFactory } from './sign-in.factory';
import { SignInInput } from '@/domain/sign-in/sign-in.repository';

export async function signInController(
  req: FastifyRequest<{ Querystring: SignInInput }>,
  reply: FastifyReply
) {
  const { username, password } = req.query;

  if (!username || !password) {
    return reply.status(400).send({ error: 'Missing params error' });
  }

  const signInUseCase = signInFactory();

  try {
    const user = await signInUseCase.execute({ username, password });
    return reply.send(user);
  } catch {
    return reply.status(404).send({ error: 'Invalid credentials' });
  }
}
