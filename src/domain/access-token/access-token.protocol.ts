export type AccessTokenInput = {
  key: string;
};

export type AccessTokenOutput = {
  accessToken: string;
};

export interface AccessTokenProtocol {
  generate(input: AccessTokenInput): Promise<AccessTokenOutput>;
}
