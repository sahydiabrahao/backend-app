export interface SaveUserInput {
  email: string;
  password: string;
}

export interface SaveUserOutput {
  id: string;
  email: string;
}

export interface SaveUser {
  save(input: SaveUserInput): Promise<SaveUserOutput>;
}
