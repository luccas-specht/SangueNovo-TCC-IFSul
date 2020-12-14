import { injectable, inject } from 'tsyringe';

import { Users } from '@modules/users/infra/typeorm/entities/users';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface Request {
    userId: string,
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ userId }: Request): Promise<Users[]> {
        return await this.usersRepository.findAllProvides(userId);
    };
};

export { ListProvidersService };