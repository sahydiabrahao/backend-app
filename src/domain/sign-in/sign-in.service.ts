export type SignInInput = { username: string; password: string };
export type SignInOutput = { id: string; username: string; password: string; token: string };
export type SignInOutputWithoutNull = Exclude<SignInOutput, null>;
export interface SignInService {
  findByUsername(input: SignInInput): Promise<SignInOutput | null>;
}
