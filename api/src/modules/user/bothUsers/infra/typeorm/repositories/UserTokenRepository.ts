import { getRepository, Repository } from 'typeorm';

import { AppUserToken } from '../entities/AppUserToken';

import { IUserTokenRepository } from '@modules/user/bothUsers/IRepository/IUserTokenRepository';

export class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<AppUserToken>

  constructor (){
   this.ormRepository = getRepository(AppUserToken);
  }
  
  public async generate(user_id: string): Promise<AppUserToken> {
    const userToken = this.ormRepository.create({ user_id });
    return this.ormRepository.save(userToken); 
  }

  public async findByToken(token: string): Promise<AppUserToken | undefined> {
    return this.ormRepository.findOne({ where: { token }});
  }
};