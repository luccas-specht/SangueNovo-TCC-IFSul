import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { User } from '../infra/typeorm/entities/User';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { messagaEmailAlreadyExists } from '../constants/messageToUser';

interface RequestCreateDonationService {
  name: string;
  email: string;
  password: string;
}
@injectable()
export class CreateDonatorService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}
  
  public async execute({ email, name, password }: RequestCreateDonationService): Promise<User> {
        
    const user = await this.usersRepository.findByEmail(email);

    if (user) throw new AppError(messagaEmailAlreadyExists, 400);
    
    const hasedPassword = await hash(password, 8);

    return await this.usersRepository.createAndSave(name, email, hasedPassword);
  };
  
};