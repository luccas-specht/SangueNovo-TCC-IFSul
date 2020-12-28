import { getRepository, Repository } from 'typeorm';

import { AppUser } from '../entities/AppUser';

import { IUserRepository } from '@modules/Irepository/IUsersRepository';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<AppUser>

  constructor (){
   this.ormRepository = getRepository(AppUser);
  }

  public async save(user: AppUser): Promise<AppUser> {
   return await this.ormRepository.save(user);
  }
  
  public async findById(id: string): Promise<AppUser | undefined> {
   return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<AppUser | undefined> {
   return await this.ormRepository.findOne({ where: { email } });
  }
  
  public async createAndSave(email: string, password: string): Promise<AppUser> {
   const appointment = this.ormRepository.create({ email, password });
   return await this.ormRepository.save(appointment);
  }
};