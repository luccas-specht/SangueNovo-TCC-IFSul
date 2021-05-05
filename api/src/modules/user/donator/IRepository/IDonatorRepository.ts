import { AppDonator } from '../infra/typeorm/entities/AppDonator';

export interface IDonatorRepository {
  save(donator: AppDonator): Promise<AppDonator>;
  update(donator: AppDonator): Promise<AppDonator>;
  findById(id: string): Promise<AppDonator | undefined>;
  findByIdUser(tb_user_fk: string): Promise<AppDonator | undefined>;
}
