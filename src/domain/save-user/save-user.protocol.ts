export interface SaveUserInput {
  email: string;
  password: string;
}

export interface SaveUserOutput {
  id: string;
  email: string;
}

export interface SaveUserProtocol {
  save(input: SaveUserInput): Promise<SaveUserOutput>;
}
