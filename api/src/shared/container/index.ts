import { container } from 'tsyringe';

/*Repositories*/
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { UserRepository } from '@modules/user/bothUsers/infra/typeorm/repositories/UserRepository';

import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { DonatorRepository } from '@modules/user/donator/infra/typeorm/repositories/DonatorRepository';

import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { InstitutionRepository } from '@modules/user/institution/infra/typeorm/repositories/InstitutionRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);
container.registerSingleton<IInstitutionRepository>('InstitutionRepository', InstitutionRepository);