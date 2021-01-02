import { getRepository, Repository } from 'typeorm';

import { AppInstitution } from '../entities/AppInstitution';

import { IInstitutionRepository} from '../../../iRepository/IInstitutionRepository';

export class InstitutionRepository implements IInstitutionRepository {
  private ormRepository: Repository<AppInstitution>

  constructor () {
   this.ormRepository = getRepository(AppInstitution)
  }

  public async save(institution: AppInstitution): Promise<AppInstitution> {
   return await this.ormRepository.save(institution)
  }

  public async findById(id: string): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { id } })
  }
  
  public async findByCnpj(cnpj: string): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { cnpj } })
  }
}
