export const usersSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
    },
  },
};
