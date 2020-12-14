import { getRepository, Repository, Not } from 'typeorm';

import { Users } from '../entities/users';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>

  constructor (){
   this.ormRepository = getRepository(Users);
  }

  public async save(user: Users): Promise<Users> {
   return await this.ormRepository.save(user);
  }
  
  public async findById(id: string): Promise<Users | undefined> {
   return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
   return await this.ormRepository.findOne({ where: { email } });
  }
  
  public async createAndSave(name: string, email: string, password: string): Promise<Users> {
   const appointment = this.ormRepository.create({ name, email, password });
   return await this.ormRepository.save(appointment);
  }

  public async findAllProvides(exceptUserId?: string): Promise<Users[]>{
    return exceptUserId ? await this.ormRepository.find({ where: { id: Not(exceptUserId) } })
    : await this.ormRepository.find();
  }
};

export { UsersRepository };
