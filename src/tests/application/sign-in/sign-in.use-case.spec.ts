import { SignInUseCase } from '@/application/sign-in/sign-in.use-case';
import { AccessTokenProtocol } from '@/domain/access-token/access-token.protocol';
import { InvalidCredentialsError } from '@/domain/errors';
import { FindUserByUsernameProtocol } from '@/domain/find-user-by-username/find-user-by-username.protocol';

const FAKE_INPUT = {
  username: 'any-username',
  password: 'any-password',
};

const FAKE_USER = {
  id: 'any-id',
  username: 'any-username',
  password: 'any-password',
};

const FAKE_TOKEN = {
  accessToken: 'any-valid-token',
};

type SutTypes = {
  sut: SignInUseCase;
  findUserByUsernameStub: FindUserByUsernameProtocol;
  accessTokenStub: AccessTokenProtocol;
};

const makeAccessTokenStub = (): AccessTokenProtocol => {
  class AccessTokenStub implements AccessTokenProtocol {
    async generate() {
      return FAKE_TOKEN;
    }
  }
  return new AccessTokenStub();
};

const makeFindUserByUsernameStub = (): FindUserByUsernameProtocol => {
  class FindUserByUsernameStub implements FindUserByUsernameProtocol {
    async findByUsername() {
      return FAKE_USER;
    }
  }
  return new FindUserByUsernameStub();
};

const makeSut = (): SutTypes => {
  const findUserByUsernameStub = makeFindUserByUsernameStub();
  const accessTokenStub = makeAccessTokenStub();
  const sut = new SignInUseCase(findUserByUsernameStub, accessTokenStub);
  return {
    sut,
    findUserByUsernameStub,
    accessTokenStub,
  };
};

describe('SignInUseCase', () => {
  it('should call FindUserByUsername with correct input', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    const findByUsernameSpy = jest.spyOn(findUserByUsernameStub, 'findByUsername');

    await sut.signIn(FAKE_INPUT);
    expect(findByUsernameSpy).toHaveBeenCalledWith({ username: FAKE_INPUT.username });
  });

  it('should throw if FindUserByUsername throws', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    jest
      .spyOn(findUserByUsernameStub, 'findByUsername')
      .mockRejectedValueOnce(new InvalidCredentialsError());
    await expect(() => sut.signIn(FAKE_INPUT)).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw if user is not found', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    jest.spyOn(findUserByUsernameStub, 'findByUsername').mockResolvedValueOnce(null);

    await expect(() => sut.signIn(FAKE_INPUT)).rejects.toThrow(InvalidCredentialsError);
  });

  it('should call AccessToken with correct input', async () => {
    const { sut, accessTokenStub } = makeSut();
    const generateSpy = jest.spyOn(accessTokenStub, 'generate');

    await sut.signIn(FAKE_INPUT);

    expect(generateSpy).toHaveBeenCalledWith({ key: 'any-id' });
  });

  it('should throw if AccessToken throws', async () => {
    const { sut, accessTokenStub } = makeSut();
    jest.spyOn(accessTokenStub, 'generate').mockRejectedValueOnce(new Error('token-error'));

    await expect(() => sut.signIn(FAKE_INPUT)).rejects.toThrow('token-error');
  });

  it('should return token on success', async () => {
    const { sut } = makeSut();

    const result = await sut.signIn(FAKE_INPUT);

    expect(result).toEqual({
      accessToken: 'any-valid-token',
      userId: 'any-id',
    });
  });
});
