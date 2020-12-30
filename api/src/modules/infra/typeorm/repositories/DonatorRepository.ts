import { getRepository, Repository } from 'typeorm';

import { AppDonator } from '../entities/AppDonator';

import { IDonatorRepository, IDTODonator } from '@modules/Irepository/IDonatorRepository';

export class DonatorRepository implements IDonatorRepository {
  private ormRepository: Repository<AppDonator>

  constructor () {
   this.ormRepository = getRepository(AppDonator)
  }

  public async save(donator: AppDonator): Promise<AppDonator> {
   return await this.ormRepository.save(donator)
  }

  public async findById(id: string): Promise<AppDonator | undefined> {
    return await this.ormRepository.findOne({ where: { id } })
  }
  
  public async findByEmail(email: string): Promise<AppDonator | undefined> {
    return await this.ormRepository.findOne({ where: { email } })
  }

  public async findByCpf(cpf: string): Promise<AppDonator | undefined> {
    return await this.ormRepository.findOne({ where: { cpf } })
  }

  public async createAndSave(donatorProps: IDTODonator): Promise<AppDonator>{
    const donator = this.ormRepository.create(donatorProps)
    return await this.ormRepository.save(donator)
  }
}
