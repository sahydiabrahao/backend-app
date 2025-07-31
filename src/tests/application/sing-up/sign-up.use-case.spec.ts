import { CheckUserByEmailProtocol } from '@/domain/check-user-by-email/check-user-by-email.protocol';
import { HashPasswordProtocol } from '@/domain/hash-password/hash-password.protocol';
import { SaveUserProtocol } from '@/domain/save-user/save-user.protocol';
import { EmailAlreadyExistsError } from '@/domain/errors';
import { SignUpUseCase } from '@/application/sign-up/sign-up.use-case';

const FAKE_INPUT = {
  email: 'any-email',
  password: 'any-password',
};

const FAKE_HASH = {
  hash: 'hashed-password',
};

const FAKE_USER = {
  id: 'any-id',
  email: 'any-email',
};

type SutTypes = {
  sut: SignUpUseCase;
  checkUserByEmailStub: CheckUserByEmailProtocol;
  hashPasswordStub: HashPasswordProtocol;
  saveUserStub: SaveUserProtocol;
};

const makeCheckUserByEmailStub = (): CheckUserByEmailProtocol => {
  class CheckUserByEmailStub implements CheckUserByEmailProtocol {
    async check() {
      return false;
    }
  }
  return new CheckUserByEmailStub();
};

const makeHashPasswordStub = (): HashPasswordProtocol => {
  class HashPasswordStub implements HashPasswordProtocol {
    async hash() {
      return FAKE_HASH;
    }
  }
  return new HashPasswordStub();
};

const makeSaveUserStub = (): SaveUserProtocol => {
  class SaveUserStub implements SaveUserProtocol {
    async save() {
      return FAKE_USER;
    }
  }
  return new SaveUserStub();
};

const makeSut = (): SutTypes => {
  const checkUserByEmailStub = makeCheckUserByEmailStub();
  const hashPasswordStub = makeHashPasswordStub();
  const saveUserStub = makeSaveUserStub();
  const sut = new SignUpUseCase(checkUserByEmailStub, hashPasswordStub, saveUserStub);
  return {
    sut,
    checkUserByEmailStub,
    hashPasswordStub,
    saveUserStub,
  };
};

describe('SignUpUseCase', () => {
  it('should call CheckUserByEmail with correct input', async () => {
    const { sut, checkUserByEmailStub } = makeSut();
    const checkSpy = jest.spyOn(checkUserByEmailStub, 'check');
    await sut.execute(FAKE_INPUT);
    expect(checkSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });

  it('should throw if CheckUserByEmail throws', async () => {
    const { sut, checkUserByEmailStub } = makeSut();
    jest.spyOn(checkUserByEmailStub, 'check').mockRejectedValueOnce(new Error('check-error'));
    await expect(() => sut.execute(FAKE_INPUT)).rejects.toThrow('check-error');
  });

  it('should throw if email already exists', async () => {
    const { sut, checkUserByEmailStub } = makeSut();
    jest.spyOn(checkUserByEmailStub, 'check').mockResolvedValueOnce(true);
    await expect(() => sut.execute(FAKE_INPUT)).rejects.toThrow(EmailAlreadyExistsError);
  });

  it('should call HashPassword with correct input', async () => {
    const { sut, hashPasswordStub } = makeSut();
    const hashSpy = jest.spyOn(hashPasswordStub, 'hash');
    await sut.execute(FAKE_INPUT);
    expect(hashSpy).toHaveBeenCalledWith({ password: FAKE_INPUT.password });
  });

  it('should throw if HashPassword throws', async () => {
    const { sut, hashPasswordStub } = makeSut();
    jest.spyOn(hashPasswordStub, 'hash').mockRejectedValueOnce(new Error('hash-error'));
    await expect(() => sut.execute(FAKE_INPUT)).rejects.toThrow('hash-error');
  });

  it('should call SaveUser with hashed password', async () => {
    const { sut, saveUserStub } = makeSut();
    const saveSpy = jest.spyOn(saveUserStub, 'save');
    await sut.execute(FAKE_INPUT);
    expect(saveSpy).toHaveBeenCalledWith({
      email: FAKE_INPUT.email,
      password: FAKE_HASH.hash,
    });
  });

  it('should throw if SaveUser throws', async () => {
    const { sut, saveUserStub } = makeSut();
    jest.spyOn(saveUserStub, 'save').mockRejectedValueOnce(new Error('save-error'));
    await expect(() => sut.execute(FAKE_INPUT)).rejects.toThrow('save-error');
  });

  it('should return user on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(FAKE_INPUT);
    expect(result).toEqual(FAKE_USER);
  });
});
