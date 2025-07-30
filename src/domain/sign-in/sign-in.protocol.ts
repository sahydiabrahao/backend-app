export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = {
  accessToken: string;
  userId: string;
};

export interface SignInProtocol {
  execute(input: SignInInput): Promise<SignInOutput>;
}
