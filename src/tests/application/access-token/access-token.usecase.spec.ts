import { AccessTokenUseCase } from '@/application/access-token/access-token.use-case';
import { AccessTokenProtocol } from '@/domain/access-token/access-token.protocol';

const FAKE_INPUT = { key: 'any-user-id' };
const FAKE_TOKEN = { accessToken: 'any-token' };

class JwtAdapterStub implements AccessTokenProtocol {
  async generate() {
    return FAKE_TOKEN;
  }
}

type SutTypes = {
  sut: AccessTokenUseCase;
  jwtAdapterStub: AccessTokenProtocol;
};

const makeSut = (): SutTypes => {
  const jwtAdapterStub = new JwtAdapterStub();
  const sut = new AccessTokenUseCase(jwtAdapterStub);
  return { sut, jwtAdapterStub };
};

describe('AccessTokenUseCase', () => {
  it('should call AccessToken with correct input', async () => {
    const { sut, jwtAdapterStub } = makeSut();
    const generateSpy = jest.spyOn(jwtAdapterStub, 'generate');
    await sut.execute(FAKE_INPUT);
    expect(generateSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });

  it('should throw if AccessToken throws', async () => {
    const { sut, jwtAdapterStub } = makeSut();
    jest.spyOn(jwtAdapterStub, 'generate').mockRejectedValueOnce(new Error('token-error'));
    await expect(() => sut.execute(FAKE_INPUT)).rejects.toThrow('token-error');
  });

  it('should return token on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toEqual(FAKE_TOKEN);
  });
});
