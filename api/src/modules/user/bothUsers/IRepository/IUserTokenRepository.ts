import { AppUserToken } from '../infra/typeorm/entities/AppUserToken';

export interface IUserTokenRepository {
  generate(user_id: string): Promise<AppUserToken>;
  findByToken(token_id: string): Promise<AppUserToken | undefined>;
}
