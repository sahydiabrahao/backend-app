export type FindUserByUsernameInput = {
  username: string;
};

export type FindUserByUsernameOutput = {
  id: string;
  username: string;
  password: string;
};

export interface FindUserByUsernameProtocol {
  findByUsername(input: FindUserByUsernameInput): Promise<FindUserByUsernameOutput | null>;
}
