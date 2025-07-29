import { AccessTokenJwtAdapter } from '@/infra/access-token/access-token.jwt-adapter';
import jwt from 'jsonwebtoken';

describe('JwtAdapter', () => {
  const SECRET = 'test-secret';
  const EXPIRES_IN = 3600;

  const makeSut = () => {
    const sut = new AccessTokenJwtAdapter(SECRET, EXPIRES_IN);
    return { sut };
  };

  it('should return a valid access token', async () => {
    const { sut } = makeSut();
    const result = await sut.generate({ key: 'any-user-id' });

    expect(result.accessToken).toBeDefined();
    expect(typeof result.accessToken).toBe('string');

    const decoded = jwt.verify(result.accessToken!, SECRET) as jwt.JwtPayload;
    expect(decoded.sub).toBe('any-user-id');
  });

  it('should use default expiration if none is provided', async () => {
    const sut = new AccessTokenJwtAdapter('my-secret');

    const result = await sut.generate({ key: 'user-id' });

    expect(result).toHaveProperty('accessToken');
  });

  it('should throw if secret is invalid', async () => {
    const invalidAdapter = new AccessTokenJwtAdapter('', EXPIRES_IN);
    await expect(() => invalidAdapter.generate({ key: 'any-user-id' })).rejects.toThrow();
  });
});
