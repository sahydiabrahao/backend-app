import { VerifyAccessTokenJwtAdapter } from '@/infra/verify-access-token/verify-access-token';
import jwt from 'jsonwebtoken';

const SECRET = 'any-secret';
const INVALID_SECRET = 'any-invalid-secret';
const PAYLOAD = { sub: 'any-user-id' };
const VALID_TOKEN = { token: 'any-valid-token' };

const makeSut = () => {
  const sut = new VerifyAccessTokenJwtAdapter(SECRET);
  return { sut };
};

describe('VerifyAccessTokenJwtAdapter', () => {
  it('should call jwt.verify with correct input', async () => {
    const { sut } = makeSut();

    const token = jwt.sign(PAYLOAD, SECRET);
    const verifySpy = jest.spyOn(jwt, 'verify');
    await sut.verify({ token });

    expect(verifySpy).toHaveBeenCalledWith(token, SECRET);
  });

  it('should throw if jwt.verify throws', async () => {
    const { sut } = makeSut();

    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error('jwt internal failure');
    });

    await expect(sut.verify(VALID_TOKEN)).rejects.toThrow('jwt internal failure');
  });

  it('should throws if token is invalid (wrong secret)', async () => {
    const { sut } = makeSut();

    const token = jwt.sign(PAYLOAD, INVALID_SECRET);

    await expect(sut.verify({ token })).rejects.toThrow('invalid signature');
  });
  it('should return null if token is expired', async () => {
    const { sut } = makeSut();

    const expiredToken = jwt.sign(PAYLOAD, SECRET, {
      expiresIn: -1,
    });

    await expect(sut.verify({ token: expiredToken })).rejects.toThrow('jwt expired');
  });
});
