import { FastifySchema } from 'fastify';

export const signUpSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 1 },
    },
  },
};
