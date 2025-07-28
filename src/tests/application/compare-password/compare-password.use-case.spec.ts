import { ComparePasswordUseCase } from '@/application/compare-password/compare-password.use-case';
import { ComparePasswordProtocol } from '@/domain/compare-password/compare-password.protocol';

type SutTypes = {
  sut: ComparePasswordUseCase;
  comparePasswordStub: ComparePasswordProtocol;
};

const makeComparePasswordStub = (): ComparePasswordProtocol => {
  class ComparePasswordStub implements ComparePasswordProtocol {
    async compare() {
      return true;
    }
  }
  return new ComparePasswordStub();
};

const makeSut = (): SutTypes => {
  const comparePasswordStub = makeComparePasswordStub();
  const sut = new ComparePasswordUseCase(comparePasswordStub);
  return {
    sut,
    comparePasswordStub,
  };
};

const FAKE_INPUT = {
  password: 'any-password',
  hashed: 'any-hashed',
};

describe('ComparePasswordUseCase', () => {
  it('should call ComparePassword with correct input', async () => {
    const { sut, comparePasswordStub } = makeSut();
    const compareSpy = jest.spyOn(comparePasswordStub, 'compare');
    await sut.execute(FAKE_INPUT);
    expect(compareSpy).toHaveBeenCalledWith(FAKE_INPUT);
  });

  it('should throw if ComparePassword throws', async () => {
    const { sut, comparePasswordStub } = makeSut();
    jest.spyOn(comparePasswordStub, 'compare').mockRejectedValueOnce(new Error('unexpected_error'));
    await expect(sut.execute(FAKE_INPUT)).rejects.toThrow('unexpected_error');
  });
  it('should return false if password is invalid', async () => {
    const { sut, comparePasswordStub } = makeSut();
    jest.spyOn(comparePasswordStub, 'compare').mockResolvedValueOnce(false);
    await expect(sut.execute(FAKE_INPUT)).resolves.toBe(false);
  });
});
