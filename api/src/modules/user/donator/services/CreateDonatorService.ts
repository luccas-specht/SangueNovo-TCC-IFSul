import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IDonatorRepository } from '../IRepository/IDonatorRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';

import { AppDonator } from '@modules/user/donator/infra/typeorm/entities/AppDonator';

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthday: Date;
  phone: string;
}

@injectable()
export class CreateDonatorService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({
    name,
    cpf,
    birthday,
    email,
    password,
    phone,
  }: Request): Promise<void> {
    const emailUsed = await this.userRepository.findByEmail(email);

    if (emailUsed) throw new AppError(MESSAGEINVALID.emailAlreadyExists, 400);

    const cpfUsed = await this.donatorRepository.findByCpf(cpf);

    if (cpfUsed) throw new AppError(MESSAGEINVALID.cpfAlreadyExists, 400);

    const checkIfCpfIsEqualToCnpj = await this.institutionRepository.findByCnpj(
      cpf
    );

    if (checkIfCpfIsEqualToCnpj)
      throw new AppError(MESSAGEINVALID.cpfAlreadyExists, 400);

    const hasedPassword = await hash(password, 8);

    const user = await this.userRepository.create(email, hasedPassword, phone);

    const donator = {
      name,
      cpf,
      birthday,
      tb_user_fk: user,
    } as AppDonator;

    await this.donatorRepository.save(donator);
  }
}
