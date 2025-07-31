// src/application/save-user/save-user.use-case.spec.ts

import { SaveUserUseCase } from '@/application/save-user/save-user.use-case';
import { SaveUser, SaveUserInput, SaveUserOutput } from '@/domain/save-user/save-user.protocol';

const FAKE_INPUT: SaveUserInput = {
  email: 'any-email',
  password: 'hashed-password',
};

const FAKE_USER: SaveUserOutput = {
  id: 'any-id',
  email: 'any-email',
};

type SutTypes = {
  sut: SaveUserUseCase;
  saveUserStub: SaveUser;
};

const makeSaveUserStub = (): SaveUser => {
  class SaveUserStub implements SaveUser {
    async save(): Promise<SaveUserOutput> {
      return FAKE_USER;
    }
  }
  return new SaveUserStub();
};

const makeSut = (): SutTypes => {
  const saveUserStub = makeSaveUserStub();
  const sut = new SaveUserUseCase(saveUserStub);
  return {
    sut,
    saveUserStub,
  };
};

describe('SaveUserUseCase', () => {
  it('should call SaveUser with correct input', async () => {
    const { sut, saveUserStub } = makeSut();
    const saveSpy = jest.spyOn(saveUserStub, 'save');
    await sut.execute(FAKE_INPUT);
    expect(saveSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });

  it('should throw if SaveUser throws', async () => {
    const { sut, saveUserStub } = makeSut();
    jest.spyOn(saveUserStub, 'save').mockRejectedValueOnce(new Error('unexpected_error'));
    await expect(sut.execute(FAKE_INPUT)).rejects.toThrow('unexpected_error');
  });

  it('should return user on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toEqual(FAKE_USER);
  });
});
