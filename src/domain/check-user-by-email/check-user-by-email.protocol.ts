export type CheckUserByEmailInput = {
  email: string;
};

export type CheckUserByEmailOutput = boolean;

export interface CheckUserByEmailProtocol {
  check(input: CheckUserByEmailInput): Promise<CheckUserByEmailOutput>;
}
