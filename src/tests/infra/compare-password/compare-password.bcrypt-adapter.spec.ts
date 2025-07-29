import bcrypt from 'bcryptjs';
import { ComparePasswordBcryptAdapter } from '@/infra/compare-password/compare-password.bcrypt-adapter';

const makeSut = () => {
  const sut = new ComparePasswordBcryptAdapter();
  return { sut };
};

const FAKE_VALID_PASSWORD = 'any-valid-password';
const FAKE_INVALID_PASSWORD = 'any-invalid-password';

let FAKE_VALID_HASH: string;

beforeAll(async () => {
  FAKE_VALID_HASH = await bcrypt.hash(FAKE_VALID_PASSWORD, 12);
});

describe('ComparePasswordBcryptAdapter', () => {
  it('should call bcrypt.compare with correct input', async () => {
    const { sut } = makeSut();

    const spy = jest.spyOn(bcrypt, 'compare');

    await sut.compare({
      password: FAKE_VALID_PASSWORD,
      hashed: FAKE_VALID_HASH,
    });

    expect(spy).toHaveBeenCalledWith(FAKE_VALID_PASSWORD, FAKE_VALID_HASH);
  });

  it('should throw if bcrypt.compare throws', async () => {
    const { sut } = makeSut();

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw new Error('bcrypt internal error');
    });

    const input = {
      password: 'any-password',
      hashed: 'any-hash',
    };

    await expect(sut.compare(input)).rejects.toThrow('bcrypt internal error');
  });
  it('should return false if password is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.compare({
      password: FAKE_INVALID_PASSWORD,
      hashed: FAKE_VALID_HASH,
    });

    expect(result).toBe(false);
  });

  it('should return true on success', async () => {
    const { sut } = makeSut();

    const result = await sut.compare({
      password: FAKE_VALID_PASSWORD,
      hashed: FAKE_VALID_HASH,
    });

    expect(result).toBe(true);
  });
});
