export type ComparePasswordInput = {
  password: string;
  hashed: string;
};

export type ComparePasswordOutput = boolean;

export interface ComparePassword {
  compare: (input: ComparePasswordInput) => Promise<ComparePasswordOutput>;
}
