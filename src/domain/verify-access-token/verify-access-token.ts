export type VerifyAccessTokenInput = {
  token: string;
};

export type VerifyAccessTokenOutput = {
  userId: string;
} | null;

export interface VerifyAccessTokenProtocol {
  verify: (input: VerifyAccessTokenInput) => Promise<VerifyAccessTokenOutput>;
}
