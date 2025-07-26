import { InvalidCredentialsError, MissingParamsError } from '@/domain/errors';
import { SignInInput } from '@/domain/sign-in/sign-in.repository';
import { signInController } from '@/main/sign-in/sign-in.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

const mockExecute = jest.fn();
const mockFactory = { execute: mockExecute };

jest.mock('@/main/sign-in/sign-in.factory', () => ({
  signInFactory: () => mockFactory,
}));

function createMockReply() {
  const send = jest.fn();
  const status = jest.fn().mockReturnValue({ send });
  const reply = { status, send } as unknown as FastifyReply;
  return { reply, status, send };
}

function createMockRequest(query: Partial<SignInInput> = {}) {
  return {
    query,
  } as FastifyRequest<{ Querystring: SignInInput }>;
}

describe('signInController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 400 if username or password is missing', async () => {
    const req = createMockRequest({});
    const { reply, status, send } = createMockReply();

    mockExecute.mockRejectedValueOnce(new MissingParamsError());

    await signInController(req, reply);

    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith({
      error: 'Missing params error',
    });
  });

  it('Should return 401 if credentials are invalid', async () => {
    const input: SignInInput = {
      username: 'invalid-username',
      password: 'invalid-password',
    };

    mockExecute.mockRejectedValueOnce(new InvalidCredentialsError());

    const req = createMockRequest(input);
    const { reply, status, send } = createMockReply();

    await signInController(req, reply);

    expect(mockExecute).toHaveBeenCalledWith(input);
    expect(status).toHaveBeenCalledWith(401);
    expect(send).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });

  it('Should return 200 and the user if credentials are valid', async () => {
    const input: SignInInput = {
      username: 'valid-username',
      password: 'valid-password',
    };

    const mockUser = {
      id: 'any-id',
      username: 'valid-usernamer',
    };

    mockExecute.mockResolvedValueOnce(mockUser);

    const req = createMockRequest(input);
    const { reply, status, send } = createMockReply();

    await signInController(req, reply);

    expect(mockExecute).toHaveBeenCalledWith(input);
    expect(status).not.toHaveBeenCalled();
    expect(send).toHaveBeenCalledWith(mockUser);
  });
});
