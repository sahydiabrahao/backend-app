import bcrypt from 'bcryptjs';
import { ComparePasswordBcryptAdapter } from '@/infra/compare-password/compare-password.bcrypt-adapter';

jest.mock('bcryptjs');

const makeSut = () => {
  const sut = new ComparePasswordBcryptAdapter();
  return { sut };
};

const FAKE_INPUT = {
  password: 'any-password',
  hashed: 'hashed-password',
};

describe('ComparePasswordBcryptAdapter', () => {
  it('should call bcrypt.compare with correct input', async () => {
    const { sut } = makeSut();

    await sut.compare(FAKE_INPUT);

    expect(bcrypt.compare).toHaveBeenCalledWith(FAKE_INPUT.password, FAKE_INPUT.hashed);
  });

  it('should throw if bcrypt.compare throws', async () => {
    const { sut } = makeSut();
    (bcrypt.compare as jest.Mock).mockImplementationOnce(() => {
      throw new Error('bcrypt error');
    });

    await expect(sut.compare(FAKE_INPUT)).rejects.toThrow('bcrypt error');
  });
  it('should return false if password is invalid', async () => {
    const { sut } = makeSut();
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const result = await sut.compare(FAKE_INPUT);

    expect(result).toBe(false);
  });
});
