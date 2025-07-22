export type SignInInput = { username: string; password: string };
export type SignInOutput = { id: string; username: string } | null;

export interface SignInRepository {
  findByUsername(input: SignInInput): Promise<SignInOutput | null>;
}
