import { FastifySchema } from 'fastify';

export const signInSchema: FastifySchema = {
  querystring: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 1 },
    },
  },
};
