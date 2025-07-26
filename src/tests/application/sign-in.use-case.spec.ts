import { SignInUseCase } from '@/application/sign-in/sign-in.use-case';
import { InvalidCredentialsError, MissingParamsError } from '@/domain/errors';
import { SignInInput, SignInOutput, SignInService } from '@/domain/sign-in/sign-in.service';

type SutTypes = {
  sut: SignInUseCase;
  signInDatabaseStub: SignInService;
};

const makeSignInRepositoryStub = (): SignInService => {
  class SignInRepositoryStub implements SignInService {
    async findByUsername() {
      return anyOutput;
    }
  }
  return new SignInRepositoryStub();
};

const makeSut = (): SutTypes => {
  const signInDatabaseStub = makeSignInRepositoryStub();
  const sut = new SignInUseCase(signInDatabaseStub);
  return {
    sut,
    signInDatabaseStub,
  };
};

const anyInput: SignInInput = { username: 'any-username', password: 'any-password' };
const anyOutput: SignInOutput = {
  id: 'any-id',
  username: 'any-username',
  password: 'any-password',
};
describe('SignInUseCase', () => {
  test('Should call SignInDatabaseStub with correct values', async () => {
    const { sut, signInDatabaseStub } = makeSut();
    const findByUsernameSpy = jest.spyOn(signInDatabaseStub, 'findByUsername');
    await sut.execute(anyInput);
    expect(findByUsernameSpy).toHaveBeenCalledWith(anyInput);
  });

  test('Should throw if SignInDatabaseStub throws', async () => {
    const { sut, signInDatabaseStub } = makeSut();
    jest
      .spyOn(signInDatabaseStub, 'findByUsername')
      .mockRejectedValueOnce(new InvalidCredentialsError());
    const promise = sut.execute(anyInput);
    expect(promise).rejects.toThrow(InvalidCredentialsError);
  });
  it('Should throw MissingParamsError if input is empty', async () => {
    const { sut } = makeSut();

    await expect(sut.execute({} as unknown as SignInInput)).rejects.toThrow(MissingParamsError);
  });
  it('Should throw InvalidCredentialsError if password is incorrect', async () => {
    const signInRepositoryStub: SignInService = {
      findByUsername: jest
        .fn()
        .mockResolvedValue({ username: 'any-username', password: 'invalid-password' }),
    };
    const useCase = new SignInUseCase(signInRepositoryStub);
    await expect(useCase.execute(anyInput)).rejects.toThrow(InvalidCredentialsError);
  });
  test('Should return successfully if SignInDatabaseStub resolves', async () => {
    const { sut, signInDatabaseStub } = makeSut();
    jest.spyOn(signInDatabaseStub, 'findByUsername').mockResolvedValueOnce(anyOutput);
    const result = await sut.execute(anyInput);
    expect(result).toEqual(anyOutput);
  });
});
