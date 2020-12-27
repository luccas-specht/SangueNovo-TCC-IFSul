import { getRepository, Repository, Not } from 'typeorm';

import { User } from '../entities/User';

import { IUsersRepository } from '@modules/Irepository/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor (){
   this.ormRepository = getRepository(User);
  }

  public async save(user: User): Promise<User> {
   return await this.ormRepository.save(user);
  }
  
  public async findById(id: string): Promise<User | undefined> {
   return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
   return await this.ormRepository.findOne({ where: { email } });
  }
  
  public async createAndSave(name: string, email: string, password: string): Promise<User> {
   const appointment = this.ormRepository.create({ email, password });
   return await this.ormRepository.save(appointment);
  }

  public async findAllProvides(exceptUserId?: string): Promise<User[]>{
    return exceptUserId 
    ? await this.ormRepository.find({ where: { id: Not(exceptUserId) } })
    : await this.ormRepository.find();
  }
};

export { UsersRepository };
