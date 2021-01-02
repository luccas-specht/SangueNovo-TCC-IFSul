import { container } from 'tsyringe';

/*providers*/
import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { DonatorRepository } from '@modules/user/donator/infra/typeorm/repositories/DonatorRepository';

import { IInstitutionRepository } from '@modules/user/institution/iRepository/IInstitutionRepository';
import { InstitutionRepository } from '@modules/user/institution/infra/typeorm/repositories/InstitutionRepository';

import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { UserRepository } from '@modules/user/bothUsers/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IInstitutionRepository>('InstitutionRepository', InstitutionRepository);