import { getRepository, Repository } from 'typeorm';

import { AppDonator } from '../entities/AppDonator';
import { AppCPF } from '../entities/AppCPF';

import { IDonatorRepository } from '@modules/Irepository/IDonatorRepository';

export class DonatorRepository implements IDonatorRepository {
  private ormRepository: Repository<AppDonator>

  constructor (){
   this.ormRepository = getRepository(AppDonator);
  }

  public async save(user: AppDonator): Promise<AppDonator> {
   return await this.ormRepository.save(user);
  }
  

  public async findByEmail(email: string): Promise<AppDonator | undefined> {
    return await this.ormRepository.findOne({ where: { email } });
   }
};
