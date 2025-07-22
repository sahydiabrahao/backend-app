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

const fakeInput: SignInInput = { username: 'fake-username', password: 'fake-password' };
describe('SignInUseCase', () => {
  test('Should call SignInDatabaseStub with correct values', async () => {
    const { sut, signInDatabaseStub } = makeSut();
    const findByUsernameSpy = jest.spyOn(signInDatabaseStub, 'findByUsername');

    await sut.execute(fakeInput);

    expect(findByUsernameSpy).toHaveBeenCalledWith({ username: 'johndoe', password: '123456' });
  });

  test('Should throw if SignInDatabaseStub throws', async () => {
    const { sut, signInDatabaseStub } = makeSut();
    jest.spyOn(signInDatabaseStub, 'findByUsername').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeInput);
    expect(promise).rejects.toThrow();
  });
  test('Should return successfully if SignInDatabaseStub resolves', async () => {
    const { sut, signInDatabaseStub } = makeSut();

    const fakeUser = { id: '1', username: 'johndoe' };

    jest.spyOn(signInDatabaseStub, 'findByUsername').mockResolvedValueOnce(fakeUser);

    const result = await sut.execute(fakeInput);

    expect(result).toEqual(fakeUser);
  });
});
