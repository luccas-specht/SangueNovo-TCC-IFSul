import { getRepository, Repository } from 'typeorm';

import { Donator } from '../entities/Donator';

import { IDonatorRepository } from '@modules/Irepository/IDonatorRepository';

export class DonatorRepository implements IDonatorRepository {
  private ormRepository: Repository<Donator>

  constructor (){
   this.ormRepository = getRepository(Donator);
  }

  public async save(user: Donator): Promise<Donator> {
   return await this.ormRepository.save(user);
  }
  
  public async createAndSave(name: string, cpf: string, birthday: Date, email: string, password: string): Promise<Donator> {
   const donator = this.ormRepository.create({name, cpf, birthday, email, password });
   return await this.save(donator)
  }

  public async findByEmail(email: string): Promise<Donator | undefined> {
    return await this.ormRepository.findOne({ where: { email } });
   }
};
