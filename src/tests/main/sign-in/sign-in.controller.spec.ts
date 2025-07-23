import { SignInInput } from '@/domain/sign-in/sign-in.repository';
import { signInController } from '@/main/sign-in/sign-in.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

const mockExecute = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
const mockFactory = { execute: mockExecute };

jest.mock('@/main/sign-in/sign-in.factory', () => ({
  signInFactory: () => mockFactory,
}));

describe('signInController', () => {
  it('Should return 400 if username or password is missing', async () => {
    const mockRequest = {
      query: {},
    } as FastifyRequest<{ Querystring: SignInInput }>;

    const sendMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ send: sendMock });
    const mockReply = { status: statusMock } as unknown as FastifyReply;

    await signInController(mockRequest, mockReply);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(sendMock).toHaveBeenCalledWith({
      error: 'Missing params error',
    });
  });
  it('Should return 404 if credentials are invalid', async () => {
    const input: SignInInput = {
      username: 'invalid-user',
      password: 'wrong-pass',
    };

    const mockRequest = {
      query: input,
    } as FastifyRequest<{ Querystring: SignInInput }>;

    const sendMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ send: sendMock });
    const mockReply = { status: statusMock } as unknown as FastifyReply;

    await signInController(mockRequest, mockReply);

    expect(mockExecute).toHaveBeenCalledWith(input);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });
});
