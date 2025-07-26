export type SignInInput = { username: string; password: string };
export type SignInOutput = { id: string; username: string; password: string } | null;
export type SignInOutputWithoutNull = Exclude<SignInOutput, null>;
export interface SignInRepository {
  findByUsername(input: SignInInput): Promise<SignInOutput | null>;
}
