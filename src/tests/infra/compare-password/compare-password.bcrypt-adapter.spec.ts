import bcrypt from 'bcryptjs';
import { ComparePasswordBcryptAdapter } from '@/infra/compare-password/compare-password.bcrypt-adapter';

jest.mock('bcryptjs');

const makeSut = () => {
  const sut = new ComparePasswordBcryptAdapter();
  return { sut };
};

describe('ComparePasswordBcryptAdapter', () => {
  it('should call bcrypt.compare with correct input', async () => {
    const { sut } = makeSut();
    const input = {
      password: 'plain-password',
      hashed: 'hashed-password',
    };

    await sut.compare(input);

    expect(bcrypt.compare).toHaveBeenCalledWith(input.password, input.hashed);
  });
});
