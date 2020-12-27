import { injectable, inject } from 'tsyringe';

import { User } from '../infra/typeorm/entities/User';
import { AppError } from '@shared/errors/appError';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
    userId: string,
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ userId }: Request): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if(!user) throw new AppError('Usuário não encontrado.', 400);

        return user;
    };
};

export { ShowProfileService };