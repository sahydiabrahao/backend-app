import { SignInUseCase } from '@/application/sign-in/sign-in.use-case';
import { SignInInput, SignInRepository } from '@/domain/sign-in/sign-in.repository';

type SutTypes = {
  sut: SignInUseCase;
  signInDatabaseStub: SignInRepository;
};

const makeSignInDatabaseStub = (): SignInRepository => {
  class SignInRepositoryStub implements SignInRepository {
    async findByUsername(input: SignInInput) {
      return { id: 'any_id', username: input.username };
    }
  }
  return new SignInRepositoryStub();
};

const makeSut = (): SutTypes => {
  const signInDatabaseStub = makeSignInDatabaseStub();
  const sut = new SignInUseCase(signInDatabaseStub);
  return {
    sut,
    signInDatabaseStub,
  };
};

describe('SignInUseCase', () => {
  test('Should call SignInDatabaseStub with correct values', async () => {
    const { sut, signInDatabaseStub } = makeSut();
    const findByUsernameSpy = jest.spyOn(signInDatabaseStub, 'findByUsername');

    const input = { username: 'johndoe', password: '123456' };
    await sut.execute(input);

    expect(findByUsernameSpy).toHaveBeenCalledWith({ username: 'johndoe', password: '123456' });
  });

  test('Should throw if SignInDatabaseStub throws', async () => {
    const { sut, signInDatabaseStub } = makeSut();
    jest.spyOn(signInDatabaseStub, 'findByUsername').mockRejectedValueOnce(new Error());

    const input = { username: 'johndoe', password: '123456' };

    const promise = sut.execute(input);
    expect(promise).rejects.toThrow();
  });
});
