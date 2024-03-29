import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IDonatorRepository } from '../IRepository/IDonatorRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

import { AppDonator } from '@modules/user/donator/infra/typeorm/entities/AppDonator';

interface Request {
  name: string;
  email: string;
  password: string;
  phone: string;
}

@injectable()
export class CreateDonatorService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository
  ) {}

  public async execute({
    name,
    phone,
    email,
    password,
  }: Request): Promise<void> {
    const emailUsed = await this.userRepository.findByEmail(email);
    if (emailUsed) throw new AppError(MESSAGEINVALID.emailAlreadyExists);

    const phoneUsed = await this.userRepository.findByPhone(phone);
    if (phoneUsed) throw new AppError(MESSAGEINVALID.phoneAlreadyExists);

    const hasedPassword = await hash(password, 8);

    const user = await this.userRepository.create(email, hasedPassword, phone);

    const donator = {
      name,
      tb_user_fk: user,
    } as AppDonator;

    await this.donatorRepository.save(donator);
  }
}
