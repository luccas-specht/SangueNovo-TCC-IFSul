import { hash, compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IDonatorRepository } from '../IRepository/IDonatorRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

import { AppDonator } from '@modules/user/donator/infra/typeorm/entities/AppDonator';
import { AppUser } from '@modules/user/bothUsers/infra/typeorm/entities/AppUser';

interface Request {
  name?: string;
  phone?: string;
  password?: string;
  userId: string;
}

@injectable()
export class UpdateDonatorService {
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
    userId,
  }: Request): Promise<AppDonator> {
    if (!name && !phone && !password)
      throw new AppError(MESSAGEINVALID.noUpdate);

    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    if (password && (await compare(password, user.password)))
      throw new AppError(MESSAGEINVALID.newPasswordEqualsOldPassword);

    if (phone && (await this.userRepository.findByPhone(phone)))
      throw new AppError(MESSAGEINVALID.phoneAlreadyExists);

    const donator = await this.donatorRepository.findByIdUser(user.id);
    if (!donator) throw new AppError(MESSAGEINVALID.userNotExists);

    if (password) user.password = await hash(password, 8);
    if (phone) user.phone = phone;

    await this.userRepository.save(user);

    if (name) donator.name = name;
    donator.tb_user_fk = user;

    return donator;
  }
}
