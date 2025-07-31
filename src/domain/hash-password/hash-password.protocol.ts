export type HashPasswordInput = {
  password: string;
};

export type HashPasswordOutput = {
  hash: string;
};

export interface HashPassword {
  hash(input: HashPasswordInput): Promise<HashPasswordOutput>;
}
