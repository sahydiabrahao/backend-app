// src/application/sign-in/find-user-by-username/find-user-by-username.use-case.spec.ts

import { FindUserByUsernameUseCase } from '@/application/find-user-by-username/find-user-by-username.use-case';
import { FindUserByUsernameProtocol } from '@/domain/find-user-by-username/find-user-by-username.protocol';

const FAKE_INPUT = {
  username: 'any-username',
};

const FAKE_USER = {
  id: 'any-id',
  username: 'any-username',
  password: 'any-password',
};

type SutTypes = {
  sut: FindUserByUsernameUseCase;
  findUserByUsernameStub: FindUserByUsernameProtocol;
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
  const sut = new FindUserByUsernameUseCase(findUserByUsernameStub);
  return {
    sut,
    findUserByUsernameStub,
  };
};

describe('FindUserByUsernameUseCase', () => {
  it('should call FindUserByUsername with correct input', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    const findByUsernameSpy = jest.spyOn(findUserByUsernameStub, 'findByUsername');
    await sut.execute(FAKE_INPUT);
    expect(findByUsernameSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });

  it('should throw if FindUserByUsername throws', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    jest
      .spyOn(findUserByUsernameStub, 'findByUsername')
      .mockRejectedValueOnce(new Error('unexpected_error'));
    await expect(sut.execute(FAKE_INPUT)).rejects.toThrow('unexpected_error');
  });

  it('should return user on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toEqual(FAKE_USER);
  });

  it('should return null if user is not found', async () => {
    const { sut, findUserByUsernameStub } = makeSut();
    jest.spyOn(findUserByUsernameStub, 'findByUsername').mockResolvedValueOnce(null);
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toBeNull();
  });
});
