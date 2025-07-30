import { VerifyAccessTokenUseCase } from '@/application/verify-access-token/verify-access-token.use-case';
import { VerifyAccessTokenProtocol } from '@/domain/verify-access-token/verify-access-token';

const makeVerifyAccessTokenStub = (): VerifyAccessTokenProtocol => ({
  verify: jest.fn(async () => ({ userId: 'user-123' })),
});

const makeSut = () => {
  const verifyTokenStub = makeVerifyAccessTokenStub();
  const sut = new VerifyAccessTokenUseCase(verifyTokenStub);
  return { sut, verifyTokenStub };
};

const FAKE_INPUT = {
  token: 'valid-token',
};

describe('VerifyAccessTokenUseCase', () => {
  it('should call VerifyAccessToken with correct input', async () => {
    const { sut, verifyTokenStub } = makeSut();
    const spy = jest.spyOn(verifyTokenStub, 'verify');

    await sut.execute(FAKE_INPUT);

    expect(spy).toHaveBeenCalledWith(FAKE_INPUT);
  });
});
