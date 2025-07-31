export type SignUpInput = {
  email: string;
  password: string;
};

export type SignUpOutput = {
  id: string;
  email: string;
};

export interface SignUpProtocol {
  execute(input: SignUpInput): Promise<SignUpOutput>;
}
