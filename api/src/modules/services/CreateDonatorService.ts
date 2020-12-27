import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { Donator } from '../infra/typeorm/entities/Donator';

import { IDonatorRepository } from '../Irepository/IDonatorRepository';
import { messagaEmailAlreadyExists } from '../constants/messageToUser';

interface RequestCreateDonationService {
  name: string;
  email: string;
  password: string;
  cpf: string, 
  birthday: Date,
}

@injectable()
export class CreateDonatorService {

  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository
    ) {}
  
  public async execute({ name, cpf, birthday, email, password }: RequestCreateDonationService): Promise<Donator> {
        
    const user = await this.donatorRepository.findByEmail(email);

    if (user) throw new AppError(messagaEmailAlreadyExists, 400);
    
    const hasedPassword = await hash(password, 8);

    return await this.donatorRepository.createAndSave(name, cpf, birthday, email, hasedPassword);
  };
  
};