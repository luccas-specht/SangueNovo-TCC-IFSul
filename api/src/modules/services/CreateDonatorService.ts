import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { AppDonator } from '../infra/typeorm/entities/AppDonator';

import { IDonatorRepository } from '../Irepository/IDonatorRepository';
import { IUserRepository } from '../Irepository/IUsersRepository';

import { messagaEmailAlreadyExists } from '../constants/messageToUser';

interface RequestCreateDonationService {
  name: string;
  email: string;
  password: string;
  cpf: any, 
  birthday: Date,
}

@injectable()
export class CreateDonatorService {

  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,
   
    @inject('UserRepository')
    private userRepository: IUserRepository
    ) {} 
  
  public async execute({ name, cpf, birthday, email, password }: RequestCreateDonationService): Promise<AppDonator> {
    const user = await this.userRepository.findByEmail(email);

    if (user) throw new AppError(messagaEmailAlreadyExists, 400);
    
    const hasedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.createAndSave(email, hasedPassword);

    const { id } = userCreated;

    const userToSave = {
      id,
      name,
      cpf,
      birthday
    } as AppDonator
    
    return await this.donatorRepository.save(userToSave);
  };
};