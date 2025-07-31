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
});
