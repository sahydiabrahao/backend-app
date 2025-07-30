import { VerifyAccessTokenJwtAdapter } from '@/infra/verify-access-token/verify-access-token';
import jwt from 'jsonwebtoken';

const SECRET = 'any-secret';
const PAYLOAD = { sub: 'any-user-id' };

const makeSut = () => {
  const sut = new VerifyAccessTokenJwtAdapter(SECRET);
  return { sut };
};

describe('VerifyAccessTokenJwtAdapter', () => {
  it('should call jwt.verify with correct input', async () => {
    const token = jwt.sign(PAYLOAD, SECRET);
    const verifySpy = jest.spyOn(jwt, 'verify');

    const { sut } = makeSut();
    await sut.verify({ token });

    expect(verifySpy).toHaveBeenCalledWith(token, SECRET);
  });
});
