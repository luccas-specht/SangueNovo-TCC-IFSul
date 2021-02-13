import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { MESSAGEINVALID } from '@constants/messageToUser';

import { IInstitutionRepository } from '../IRepository/IInstitutionRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';

import { AppInstitution } from '../infra/typeorm/entities/AppInstitution';
interface RequestCreateInstitutionService {
  razaoSocial: string;
  email: string;
  password: string;
  cnpj: string, 
  phone: string
}

@injectable()
export class CreateInstitutionService {
  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,
    ) {} 
  
  public async execute({ razaoSocial, cnpj, email, phone, password }: RequestCreateInstitutionService): Promise<void> {
    const emailUsed = await this.userRepository.findByEmail(email)

    if (emailUsed) throw new AppError(MESSAGEINVALID.emailAlreadyExists, 400)
    
    const cnpjUsed = await this.institutionRepository.findByCnpj(cnpj)

    if (cnpjUsed) throw new AppError(MESSAGEINVALID.cnpjAlreadyExists, 400)

    const checkIfCnpjIsEqualToCpf = await this.donatorRepository.findByCpf(cnpj)

    if (checkIfCnpjIsEqualToCpf) throw new AppError(MESSAGEINVALID.cnpjAlreadyExists, 400)

    const hasedPassword = await hash(password, 8)

    const user = await this.userRepository.create(email, hasedPassword, phone, true);

    const institution = {
      razao_social: razaoSocial,
      cnpj,
      tb_user_fk: user
    } as AppInstitution

    await this.institutionRepository.save(institution)
  } 
}