import { signUpController } from '@/main/sign-up/sign-up.controller';
import { EmailAlreadyExistsError, MissingParamsError } from '@/domain/errors';
import { FastifyReply, FastifyRequest } from 'fastify';

const mockExecute = jest.fn();
const mockFactory = { execute: mockExecute };

jest.mock('@/main/sign-up/sign-up.factory', () => ({
  __esModule: true,
  signUpFactory: () => mockFactory,
}));

function createMockReply() {
  const send = jest.fn();
  const status = jest.fn().mockReturnValue({ send });
  const reply = { status, send } as unknown as FastifyReply;
  return { reply, status, send };
}

function createMockRequest(body: { email?: string; password?: string }): FastifyRequest {
  return {
    body,
  } as FastifyRequest;
}

describe('signUpController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if email or password is missing', async () => {
    const req = createMockRequest({});
    const { reply, status, send } = createMockReply();

    await signUpController(req, reply);

    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith({
      error: new MissingParamsError().message,
    });
  });

  it('should return 409 if email already exists', async () => {
    const input = {
      email: 'existing@email.com',
      password: 'any-password',
    };

    mockExecute.mockRejectedValueOnce(new EmailAlreadyExistsError());

    const req = createMockRequest(input);
    const { reply, status, send } = createMockReply();

    await signUpController(req, reply);

    expect(mockExecute).toHaveBeenCalledWith(input);
    expect(status).toHaveBeenCalledWith(409);
    expect(send).toHaveBeenCalledWith({
      error: new EmailAlreadyExistsError().message,
    });
  });

  it('should return 201 and user if creation is successful', async () => {
    const input = {
      email: 'new@email.com',
      password: 'any-password',
    };

    const response = {
      id: 'any-id',
      email: 'new@email.com',
    };

    mockExecute.mockResolvedValueOnce(response);

    const req = createMockRequest(input);
    const { reply, status, send } = createMockReply();

    await signUpController(req, reply);

    expect(mockExecute).toHaveBeenCalledWith(input);
    expect(status).toHaveBeenCalledWith(201);
    expect(send).toHaveBeenCalledWith(response);
  });

  it('should return 500 if unknown error is thrown', async () => {
    const input = {
      email: 'any@email.com',
      password: 'any-password',
    };

    mockExecute.mockRejectedValueOnce(new Error('unknown'));

    const req = createMockRequest(input);
    const { reply, status, send } = createMockReply();

    await signUpController(req, reply);

    expect(status).toHaveBeenCalledWith(500);
    expect(send).toHaveBeenCalledWith({ error: 'An internal server error occurred' });
  });
});
