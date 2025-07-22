import { SignInInput } from '@/domain/sign-in/sign-in.repository';
import { SignInDatabase } from '@/infra/sign-in/sign-in.database';

const makeMongoDbAdapterStub = () => ({
  findByUsername: jest.fn(),
});

const makeSut = () => {
  const mongoDbAdapterStub = makeMongoDbAdapterStub();
  const sut = new SignInDatabase(mongoDbAdapterStub);
  return { sut, mongoDbAdapterStub };
};

const fakeInput: SignInInput = { username: 'fake-username', password: 'fake-password' };
describe('SignInDatabase', () => {
  test('Should call MongoDbAdapter with correct values', async () => {
    const { sut, mongoDbAdapterStub } = makeSut();

    await sut.findByUsername(fakeInput);

    expect(mongoDbAdapterStub.findByUsername).toHaveBeenCalledWith(fakeInput);
  });
  test('Should throw if MongoDbAdapter throws', async () => {
    const { sut, mongoDbAdapterStub } = makeSut();

    jest.spyOn(mongoDbAdapterStub, 'findByUsername').mockRejectedValueOnce(new Error());

    const promise = sut.findByUsername(fakeInput);

    await expect(promise).rejects.toThrow();
  });
  test('Should return successfully if MongoDbAdapter resolves', async () => {
    const { sut, mongoDbAdapterStub } = makeSut();

    mongoDbAdapterStub.findByUsername.mockResolvedValueOnce(fakeInput);

    const result = await sut.findByUsername(fakeInput);

    expect(result).toEqual(fakeInput);
  });
});
