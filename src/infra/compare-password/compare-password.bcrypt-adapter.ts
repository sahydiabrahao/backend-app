import bcrypt from 'bcryptjs';
import {
  ComparePasswordInput,
  ComparePasswordOutput,
  ComparePasswordProtocol,
} from '@/domain/compare-password/compare-password.protocol';

export class ComparePasswordBcryptAdapter implements ComparePasswordProtocol {
  async compare(input: ComparePasswordInput): Promise<ComparePasswordOutput> {
    return bcrypt.compare(input.password, input.hashed);
  }
}
