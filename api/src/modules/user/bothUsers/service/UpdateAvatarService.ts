import { injectable, inject } from 'tsyringe';

import { AppUser } from '../infra/typeorm/entities/AppUser';
import { AppError } from '@shared/errors/appError';

import { IUserRepository } from '../IRepository/IUserRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { MESSAGEINVALID } from '@constants/messageToUser';

type Request = {
  userId: string;
  avatarFileName: string;
};

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ userId, avatarFileName }: Request): Promise<String> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError(MESSAGEINVALID.unathorized, 401);

    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);

    const fileName = await this.storageProvider.saveFile(avatarFileName);
    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user.avatar;
  }
}
