export type ComparePasswordInput = {
  password: string;
  hashed: string;
};

export type ComparePasswordOutput = boolean;

export interface ComparePasswordProtocol {
  compare: (input: ComparePasswordInput) => Promise<ComparePasswordOutput>;
}
