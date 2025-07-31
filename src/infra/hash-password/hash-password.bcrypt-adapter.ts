import {
  HashPasswordInput,
  HashPasswordOutput,
  HashPasswordProtocol,
} from '@/domain/hash-password/hash-password.protocol';
import bcrypt from 'bcryptjs';

export class HashPasswordBcryptAdapter implements HashPasswordProtocol {
  constructor(private readonly salt: number = 12) {}

  async hash(input: HashPasswordInput): Promise<HashPasswordOutput> {
    const hash = await bcrypt.hash(input.password, this.salt);
    return {
      hash: hash,
    };
  }
}
