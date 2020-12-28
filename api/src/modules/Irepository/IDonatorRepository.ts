import { AppDonator} from '../infra/typeorm/entities/AppDonator';
import { AppCPF } from '../infra/typeorm/entities/AppCPF';

export interface IDonatorRepository {
    save(donator: AppDonator): Promise<AppDonator>;
};