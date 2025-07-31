import { CheckUserByEmailUseCase } from '@/application/check-user-by-email/check-user-by-email.use-case';
import { FindUserByEmailProtocol } from '@/domain/find-user-by-email/find-user-by-email.protocol';

const FAKE_INPUT = { email: 'any-email@mail.com' };

type SutTypes = {
  sut: CheckUserByEmailUseCase;
  findUserByEmailStub: FindUserByEmailProtocol;
};

const makeFindUserByEmailStub = (): FindUserByEmailProtocol => {
  class FindUserByEmailStub implements FindUserByEmailProtocol {
    async find() {
      return {
        id: 'any-id',
        email: 'any-email@mail.com',
        password: 'any-password',
      };
    }
  }
  return new FindUserByEmailStub();
};

const makeSut = (): SutTypes => {
  const findUserByEmailStub = makeFindUserByEmailStub();
  const sut = new CheckUserByEmailUseCase(findUserByEmailStub);
  return {
    sut,
    findUserByEmailStub,
  };
};

describe('CheckUserByEmailUseCase', () => {
  it('should call FindUserByEmail with correct input', async () => {
    const { sut, findUserByEmailStub } = makeSut();
    const findSpy = jest.spyOn(findUserByEmailStub, 'find');
    await sut.execute(FAKE_INPUT);
    expect(findSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });
  it('should throw if FindUserByEmail throws', async () => {
    const { sut, findUserByEmailStub } = makeSut();
    jest.spyOn(findUserByEmailStub, 'find').mockRejectedValue(new Error('any-error'));
    await expect(sut.execute(FAKE_INPUT)).rejects.toThrow('any-error');
  });
  it('should return false if user does not exist', async () => {
    const { sut, findUserByEmailStub } = makeSut();
    jest.spyOn(findUserByEmailStub, 'find').mockResolvedValue(null);
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toBe(false);
  });
  it('should return true if user exists', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toBe(true);
  });
});
