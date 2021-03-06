import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository
  ) {}
  public async execute({ user_id, avatar }: IRequest): Promise<void> {
    const user = await this.usersRespository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar;

    await this.usersRespository.save(user);
  }
}

export { UpdateUserAvatarUseCase };
