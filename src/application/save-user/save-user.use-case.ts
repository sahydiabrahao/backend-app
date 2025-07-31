import { SaveUser, SaveUserInput, SaveUserOutput } from '@/domain/save-user/save-user.protocol';

export class SaveUserUseCase {
  constructor(private readonly saveUser: SaveUser) {}

  async execute(input: SaveUserInput): Promise<SaveUserOutput> {
    return this.saveUser.save(input);
  }
}
