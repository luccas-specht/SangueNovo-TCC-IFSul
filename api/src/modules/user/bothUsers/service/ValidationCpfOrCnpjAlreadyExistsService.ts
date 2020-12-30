import { injectable, inject } from 'tsyringe';

import { IInstitutionRepository } from '../../institution/iRepository/IInstitutionRepository';
import { IDonatorRepository } from '../../donator/iRepository/IDonatorRepository';

@injectable()
export class ValidationCpfOrCnpjAlreadyExistsService {
  
  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository ,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
    ) {}

  public async validationCpfOrCnpjAlreadyExists(cpfOrCnpj: string): Promise<any> {
    return await this.donatorRepository.findByCpf(cpfOrCnpj) 
    || await this.institutionRepository.findByCnpj(cpfOrCnpj)
    || undefined;
  }   
}