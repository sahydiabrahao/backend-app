export type CheckUserByEmailInput = {
  email: string;
};

export type CheckUserByEmailOutput = boolean;

export interface CheckUserByEmailUseCaseProtocol {
  execute(input: CheckUserByEmailInput): Promise<CheckUserByEmailOutput>;
}
