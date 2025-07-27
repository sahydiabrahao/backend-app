import { InvalidCredentialsError, MissingParamsError } from '@/domain/errors';
import { signInController } from '@/main/sign-in/sign-in.controller';
import { FastifyReply, FastifyRequest } from 'fastify';

const mockSignIn = jest.fn();
const mockFactory = { signIn: mockSignIn };

jest.mock('@/main/sign-in/sign-in.factory', () => ({
  signInFactory: () => mockFactory,
}));

function createMockReply() {
  const send = jest.fn();
  const status = jest.fn().mockReturnValue({ send });
  const reply = { status, send } as unknown as FastifyReply;
  return { reply, status, send };
}

function createMockRequest(body: { username?: string; password?: string }): FastifyRequest {
  return {
    body,
  } as FastifyRequest;
}

describe('signInController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if username or password is missing', async () => {
    const req = createMockRequest({}); // campos ausentes
    const { reply, status, send } = createMockReply();

    await signInController(req, reply);

    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith({
      error: new MissingParamsError().message,
    });
  });

  it('should return 401 if credentials are invalid', async () => {
    const input = {
      username: 'invalid-username',
      password: 'invalid-password',
    };

    mockSignIn.mockRejectedValueOnce(new InvalidCredentialsError());

    const req = createMockRequest(input);
    const { reply, status, send } = createMockReply();

    await signInController(req, reply);

    expect(mockSignIn).toHaveBeenCalledWith(input);
    expect(status).toHaveBeenCalledWith(401);
    expect(send).toHaveBeenCalledWith({
      error: new InvalidCredentialsError().message,
    });
  });

  it('should return 200 and token if credentials are valid', async () => {
    const input = {
      username: 'valid-username',
      password: 'valid-password',
    };

    const response = {
      accessToken: 'valid-token',
      userId: 'user-123',
    };

    mockSignIn.mockResolvedValueOnce(response);

    const req = createMockRequest(input);
    const { reply, status, send } = createMockReply();

    await signInController(req, reply);

    expect(mockSignIn).toHaveBeenCalledWith(input);
    expect(status).toHaveBeenCalledWith(200);
    expect(send).toHaveBeenCalledWith(response);
  });
});
