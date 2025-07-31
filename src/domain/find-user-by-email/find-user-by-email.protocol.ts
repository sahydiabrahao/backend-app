export type FindUserByEmailInput = {
  email: string;
};

export type FindUserByEmailOutput = {
  id: string;
  email: string;
  password: string;
};

export interface FindUserByEmailProtocol {
  find(input: FindUserByEmailInput): Promise<FindUserByEmailOutput | null>;
}
