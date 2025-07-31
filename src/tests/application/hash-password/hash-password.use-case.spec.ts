import { HashPasswordUseCase } from '@/application/hash-password/hash-password.use-case';
import { HashPasswordProtocol } from '@/domain/hash-password/hash-password.protocol';

const FAKE_INPUT = { password: 'any-password' };

type SutTypes = {
  sut: HashPasswordUseCase;
  hashPasswordStub: HashPasswordProtocol;
};

const makeHashPasswordStub = (): HashPasswordProtocol => {
  class HashPasswordStub implements HashPasswordProtocol {
    async hash() {
      return {
        hash: 'any-hash',
      };
    }
  }
  return new HashPasswordStub();
};

const makeSut = (): SutTypes => {
  const hashPasswordStub = makeHashPasswordStub();
  const sut = new HashPasswordUseCase(hashPasswordStub);
  return {
    sut,
    hashPasswordStub,
  };
};

describe('HashPasswordUseCase', () => {
  it('should call HashPassword with correct input', async () => {
    const { sut, hashPasswordStub } = makeSut();
    const hashPasswordSpy = jest.spyOn(hashPasswordStub, 'hash');
    await sut.execute(FAKE_INPUT);
    expect(hashPasswordSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });
  it('should throw if HashPassword throws', async () => {
    const { sut, hashPasswordStub } = makeSut();
    jest.spyOn(hashPasswordStub, 'hash').mockRejectedValueOnce(new Error('unexpected_error'));
    await expect(sut.execute(FAKE_INPUT)).rejects.toThrow('unexpected_error');
  });
});
