import { FastifyRequest, FastifyReply } from 'fastify';
import { signInFactory } from './sign-in.factory';
import { InternalServerError, MissingParamsError, HttpError } from '@/domain/errors';

export async function signInController(req: FastifyRequest, reply: FastifyReply) {
  const signInUseCase = signInFactory();

  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) throw new MissingParamsError();

    const { accessToken, userId } = await signInUseCase.execute({ email, password });

    return reply.status(200).send({ accessToken, userId });
  } catch (error) {
    if (error instanceof HttpError)
      return reply.status(error.statusCode).send({ error: error.message });

    return reply.status(500).send({ error: new InternalServerError().message });
  }
}
