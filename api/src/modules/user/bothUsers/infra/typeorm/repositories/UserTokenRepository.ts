import { getRepository, Repository } from 'typeorm';

import { AppUserToken } from '../entities/AppUserToken';

import { IUsersTokenRepository } from '@modules/user/bothUsers/IRepository/IUserTokenRepository';

export class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<AppUserToken>

  constructor (){
   this.ormRepository = getRepository(AppUserToken);
  }
  
  public async generate(): Promise<any> {
  
}

  public async findByToken(token: string): Promise<AppUserToken | undefined> {
    return await this.ormRepository.findOne({ where: { token }});
  }
};
