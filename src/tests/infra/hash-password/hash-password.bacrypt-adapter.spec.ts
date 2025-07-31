import { HashPasswordBcryptAdapter } from '@/infra/hash-password/hash-password.bcrypt-adapter';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

const FAKE_INPUT = { password: 'any-password' };
const FAKE_HASH = 'any-hash';

const makeSut = () => {
  const sut = new HashPasswordBcryptAdapter(parseInt(process.env.BCRYPT_SALT!));
  return { sut };
};

describe('BcryptAdapter', () => {
  it('should call bcrypt.hash with correct input', async () => {
    const { sut } = makeSut();
    const bcryptHashSpy = bcrypt.hash as jest.Mock;
    bcryptHashSpy.mockResolvedValue(FAKE_HASH);
    await sut.hash(FAKE_INPUT);
    expect(bcryptHashSpy).toHaveBeenCalledWith(
      FAKE_INPUT.password,
      parseInt(process.env.BCRYPT_SALT!)
    );
  });
});
