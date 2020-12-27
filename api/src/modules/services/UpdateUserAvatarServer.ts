import { injectable, inject } from 'tsyringe';

import { User } from '../infra/typeorm/entities/User';
import { AppError } from '@shared/errors/appError';

import { IUsersRepository } from '../Irepository/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
interface Request {
    user_id: string,
    avatarFileName: string
}
@injectable()
export class UpdateDonatorAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
        ) {}

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
       
        const user = await this.usersRepository.findById(user_id)

        if (!user) throw new AppError('usuario não autenticado', 401)
        
        if (user.avatar) await this.storageProvider.deleteFile(user.avatar);
        
        const fileName = await this.storageProvider.saveFile(avatarFileName);
        user.avatar = fileName

        return await this.usersRepository.save(user);
    }
};