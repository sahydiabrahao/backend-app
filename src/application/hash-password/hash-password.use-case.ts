import {
  HashPasswordInput,
  HashPasswordOutput,
  HashPasswordProtocol,
} from '@/domain/hash-password/hash-password.protocol';

export class HashPasswordUseCase {
  constructor(private readonly hashPassword: HashPasswordProtocol) {}

  async execute(input: HashPasswordInput): Promise<HashPasswordOutput> {
    return this.hashPassword.hash(input);
  }
}
