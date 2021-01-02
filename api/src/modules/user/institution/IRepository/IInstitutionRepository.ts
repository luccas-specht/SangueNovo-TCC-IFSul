import { AppInstitution } from '../infra/typeorm/entities/AppInstitution';

export interface IInstitutionRepository {
    save(institution: AppInstitution): Promise<AppInstitution>;
    findById(id: string): Promise<AppInstitution | undefined>;
    findByCnpj(cpf: string): Promise<AppInstitution | undefined>;
    findByIdUser(tb_user_fk: string): Promise<AppInstitution | undefined> 
};