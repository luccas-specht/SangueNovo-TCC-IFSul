import { Donator} from '../infra/typeorm/entities/Donator';

export interface IDonatorRepository {
    save(donator: Donator): Promise<Donator>;
    findByEmail(email: string): Promise<Donator | undefined>;
    createAndSave(name: string, cpf: string, birthday: Date, email: string, password: string): Promise<Donator>;
};