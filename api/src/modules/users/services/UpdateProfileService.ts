import { injectable, inject } from 'tsyringe';
import { compare, hash, compareSync, genSalt, encodeBase64, getRounds, getSalt, setRandomFallback, hashSync} from 'bcryptjs'
import { Users } from '../infra/typeorm/entities/users';
import { AppError } from '@shared/errors/appError';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
    userId: string,
    name: string,
    actualPassword?: string,
    password?: string
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
        ) {}

    public async execute({ userId, name, actualPassword, password }: Request): Promise<Users> {
       
        const user = await this.usersRepository.findById(userId);

        if(!user) throw new AppError('Usuário não encontrado.', 400);

        user.name = name;

        if(password && !actualPassword) throw new AppError('Senha antiga deve ser informada informada.', 400);

        if(password && actualPassword){
            const passwordMatched = await compare(actualPassword, user.password);
           
            if(!passwordMatched) throw new AppError('Senha atual incorreta.', 400);
            
            if(actualPassword === password) throw new AppError('Senha atual deve ser diferente da nova senha.', 400);

            const hasedPassword = await hash(password, 8);
            user.password = hasedPassword;
        }

        return await this.usersRepository.save(user);
    };
};

export { UpdateProfileService };