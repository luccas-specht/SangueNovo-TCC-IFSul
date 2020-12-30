import { getRepository, Repository } from 'typeorm';

import { AppInstitution } from '../entities/AppInstitution';

import { IDTOInstitution, IInstitutionRepository} from '../../../iRepository/IInstitutionRepository';

export class InstitutionRepository implements IInstitutionRepository {
  private ormRepository: Repository<AppInstitution>

  constructor () {
   this.ormRepository = getRepository(AppInstitution)
  }

  public async save(donator: AppInstitution): Promise<AppInstitution> {
   return await this.ormRepository.save(donator)
  }

  public async findById(id: string): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { id } })
  }
  
  public async findByEmail(email: string): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { email } })
  }

  public async findByCnpj(cnpj: string): Promise<AppInstitution | undefined> {
    return await this.ormRepository.findOne({ where: { cnpj } })
  }

  public async createAndSave(institutionProps: IDTOInstitution): Promise<AppInstitution>{
    const institution = this.ormRepository.create(institutionProps)
    return await this.ormRepository.save(institution)
  }
}
