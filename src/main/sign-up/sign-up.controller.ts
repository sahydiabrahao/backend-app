import { FastifyRequest, FastifyReply } from 'fastify';
import { signUpFactory } from './sign-up.factory';
import { HttpError, InternalServerError, MissingParamsError } from '@/domain/errors';

export async function signUpController(req: FastifyRequest, reply: FastifyReply) {
  const signUpUseCase = signUpFactory();

  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) throw new MissingParamsError();

    const user = await signUpUseCase.execute({ email, password });

    return reply.status(201).send(user);
  } catch (error) {
    if (error instanceof HttpError) {
      return reply.status(error.statusCode).send({ error: error.message });
    }

    return reply.status(500).send({ error: new InternalServerError().message });
  }
}
