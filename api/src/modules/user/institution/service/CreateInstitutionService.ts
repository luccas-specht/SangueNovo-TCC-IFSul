import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';

import { IInstitutionRepository, IDTOInstitution } from '../iRepository/IInstitutionRepository';

import { MESSAGEINVALID } from '../../../../constants/messageToUser';

interface RequestCreateInstitutionService {
  razaoSocial: string;
  email: string;
  password: string;
  cnpj: string, 
}

@injectable()
export class CreateInstitutionService {

  constructor(
    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository,
    ) {} 
  
  public async execute({ razaoSocial, cnpj, email, password }: RequestCreateInstitutionService): Promise<void> {
    const emailUsed = await this.institutionRepository.findByEmail(email)

    if (emailUsed) throw new AppError(MESSAGEINVALID.emailAlreadyExists, 400)
    
    const cnpjUsed = await this.institutionRepository.findByCnpj(cnpj)

    if (cnpjUsed) throw new AppError(MESSAGEINVALID.cnpjAlreadyExists, 400)

    const hasedPassword = await hash(password, 8)

    const donator = {
      razaoSocial,
      cnpj,
      email,
      password: hasedPassword,
      active: true
    } as IDTOInstitution

    await this.institutionRepository.createAndSave(donator)
  } 
}