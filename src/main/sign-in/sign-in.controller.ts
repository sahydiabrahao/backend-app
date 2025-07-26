import { FastifyRequest, FastifyReply } from 'fastify';
import { signInFactory } from './sign-in.factory';
import { SignInInput, SignInOutputWithoutNull } from '@/domain/sign-in/sign-in.service';
import { InternalServerError, InvalidCredentialsError, MissingParamsError } from '@/domain/errors';

export async function signInController(
  req: FastifyRequest<{ Querystring: SignInInput }>,
  reply: FastifyReply
) {
  const signInUseCase = signInFactory();
  try {
    const user = await signInUseCase.execute(req.query);
    const { id, username } = user as SignInOutputWithoutNull;
    return reply.status(200).send({ id, username });
  } catch (error) {
    if (error instanceof MissingParamsError)
      return reply.status(400).send({ error: error.message });
    if (error instanceof InvalidCredentialsError)
      return reply.status(401).send({ error: error.message });
    return reply.status(500).send({ error: new InternalServerError().message });
  }
}
