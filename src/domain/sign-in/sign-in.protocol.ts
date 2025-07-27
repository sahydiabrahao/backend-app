export type SignInInput = {
  username: string;
  password: string;
};

export type SignInOutput = {
  accessToken: string;
  userId: string;
};

export interface SignInProtocol {
  signIn(input: SignInInput): Promise<SignInOutput>;
}
