import { FastifySchema } from 'fastify';

export const signInSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 1 },
    },
  },
};
