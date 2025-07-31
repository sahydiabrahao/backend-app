export type HashPasswordInput = {
  password: string;
};

export type HashPasswordOutput = {
  hash: string;
};

export interface HashPasswordProtocol {
  hash(input: HashPasswordInput): Promise<HashPasswordOutput>;
}
