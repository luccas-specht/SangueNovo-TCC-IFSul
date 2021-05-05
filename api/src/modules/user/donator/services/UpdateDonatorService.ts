import { hash, compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IDonatorRepository } from '../IRepository/IDonatorRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

import { AppDonator } from '@modules/user/donator/infra/typeorm/entities/AppDonator';

interface Request {
  user_id: string;
  donator_id: string;
  name: string;
  phone: string;
  password: string;
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
    password,
    donator_id,
  }: Request): Promise<AppDonator> {
    const donator = await this.donatorRepository.findById(donator_id);
    if (!donator) throw new AppError(MESSAGEINVALID.userNotExists);

    const user = await this.userRepository.findById(donator.tb_user_fk.id);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    const phoneUsed = await this.userRepository.findByPhone(phone);
    if (phoneUsed) throw new AppError(MESSAGEINVALID.phoneAlreadyExists);

    if (await compare(password, user.password))
      throw new AppError(MESSAGEINVALID.newPasswordEqualsOldPassword);

    const hasedPassword = await hash(password, 8);
    user.phone = phone;
    user.password = hasedPassword;

    const tb_user_fk = await this.userRepository.update(user);
    donator.name = name;
    donator.tb_user_fk = tb_user_fk;

    return await this.donatorRepository.update(donator);
  }
}
