import { VerifyAccessTokenJwtAdapter } from '@/infra/verify-access-token/verify-access-token';
import jwt from 'jsonwebtoken';

const SECRET = 'any-secret';
const PAYLOAD = { sub: 'any-user-id' };
const TOKEN = { token: 'any-token' };

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

    await expect(sut.verify(TOKEN)).rejects.toThrow('jwt internal failure');
  });
});
