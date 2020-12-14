import { getRepository, Repository } from 'typeorm';

import { UsersToken } from '../entities/UserToken';

import { IUsersTokenRepository } from '@modules/users/repositories/IUserTokens';
class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UsersToken>

  constructor (){
   this.ormRepository = getRepository(UsersToken);
  }
  
  public async generate(user_id: string): Promise<UsersToken> {
    const userToken = this.ormRepository.create({
      user_id
    });
    return await this.ormRepository.save(userToken); 
  }

  public async findByToken(token: string): Promise<UsersToken | undefined> {
    return await this.ormRepository.findOne({
      where: { token }
    });
  }

};

export { UsersTokenRepository };
