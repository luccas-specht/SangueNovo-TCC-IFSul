import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { Users } from '../infra/typeorm/entities/users';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}
  
  public async execute({ email, name, password }: Request): Promise<Users> {
        
    const user = await this.usersRepository.findByEmail(email);

    if (user) throw new AppError('E-mail já está cadastrado na plataforma.', 400);
    
    const hasedPassword = await hash(password, 8);

    return await this.usersRepository.createAndSave(name, email, hasedPassword);
  }

}

export { CreateUserService };
