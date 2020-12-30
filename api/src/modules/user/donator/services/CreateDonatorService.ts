import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { FindByCpfOrCnpjUserService } from '@modules/user/bothUsers/service/FindByCpfOrCnpjUserService';
import { FindByEmailUserService } from '@modules/user/bothUsers/service/FindByEmailUserService';

import { IDonatorRepository, IDTODonator } from '../iRepository/IDonatorRepository';

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
    private donatorRepository: IDonatorRepository,

    @inject('FindByEmailUserService')
    private findByEmailUserService: FindByEmailUserService,

    @inject('FindByCpfOrCnpjUserService')
    private findByCpfOrCnpjUserService: FindByCpfOrCnpjUserService,
    ) {} 
  
  public async execute({ name, cpf, birthday, email, password }: RequestCreateDonationService): Promise<void> {
    const emailUsed = await this.findByEmailUserService.findByEmailUserService(email)
    
    if (emailUsed) throw new AppError(MESSAGEINVALID.emailAlreadyExists, 400)
    
    const cpfUsed = await this.findByCpfOrCnpjUserService.findByCpfOrCnpjUserExists(cpf)

    if (cpfUsed) throw new AppError(MESSAGEINVALID.cpfAlreadyExists, 400)

    const hasedPassword = await hash(password, 8)

    const donator = {
      name,
      cpf,
      birthday,
      email,
      password: hasedPassword,
      active: true
    } as IDTODonator

    await this.donatorRepository.createAndSave(donator)
  } 
}