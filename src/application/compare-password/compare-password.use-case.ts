import {
  ComparePasswordInput,
  ComparePasswordOutput,
  ComparePasswordProtocol,
} from '@/domain/compare-password/compare-password.protocol';

export class ComparePasswordUseCase {
  constructor(private readonly comparePassword: ComparePasswordProtocol) {}

  async execute(input: ComparePasswordInput): Promise<ComparePasswordOutput> {
    return this.comparePassword.compare(input);
  }
}
