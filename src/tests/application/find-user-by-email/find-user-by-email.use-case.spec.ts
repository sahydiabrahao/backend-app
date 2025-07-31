// src/application/sign-in/find-user-by-email/find-user-by-email.use-case.spec.ts

import { FindUserByUsernameUseCase } from '@/application/find-user-by-email/find-user-by-email.use-case';
import { FindUserByEmailProtocol } from '@/domain/find-user-by-email/find-user-by-email.protocol';

const FAKE_INPUT = {
  email: 'any-email',
};

const FAKE_USER = {
  id: 'any-id',
  email: 'any-email',
  password: 'any-password',
};

type SutTypes = {
  sut: FindUserByUsernameUseCase;
  findUserByUsernameStub: FindUserByEmailProtocol;
};

const makeFindUserByUsernameStub = (): FindUserByEmailProtocol => {
  class FindUserByUsernameStub implements FindUserByEmailProtocol {
    async find() {
      return FAKE_USER;
    }
  }
  return new FindUserByUsernameStub();
};

const makeSut = (): SutTypes => {
  const findUserByUsernameStub = makeFindUserByUsernameStub();
  const sut = new FindUserByUsernameUseCase(findUserByUsernameStub);
  return {
    sut,
    findUserByUsernameStub,
  };
};

describe('FindUserByUsernameUseCase', () => {
  it('should call FindUserByUsername with correct input', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    const findSpy = jest.spyOn(findUserByUsernameStub, 'find');
    await sut.execute(FAKE_INPUT);
    expect(findSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });

  it('should throw if FindUserByUsername throws', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    jest.spyOn(findUserByUsernameStub, 'find').mockRejectedValueOnce(new Error('unexpected_error'));
    await expect(sut.execute(FAKE_INPUT)).rejects.toThrow('unexpected_error');
  });

  it('should return user on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toEqual(FAKE_USER);
  });

  it('should return null if user is not found', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    jest.spyOn(findUserByUsernameStub, 'find').mockResolvedValueOnce(null);
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toBeNull();
  });
});
