import {
  SaveUserProtocol,
  SaveUserInput,
  SaveUserOutput,
} from '@/domain/save-user/save-user.protocol';

export class SaveUserUseCase {
  constructor(private readonly saveUser: SaveUserProtocol) {}

  async execute(input: SaveUserInput): Promise<SaveUserOutput> {
    return this.saveUser.save(input);
  }
}
