import { container } from 'tsyringe';

import { IDonatorRepository } from '@modules/user/donator/iRepository/IDonatorRepository';
import { DonatorRepository } from '@modules/user/donator/infra/typeorm/repositories/DonatorRepository';

import { IInstitutionRepository } from '@modules/user/institution/iRepository/IInstitutionRepository';
import { InstitutionRepository } from '@modules/user/institution/infra/typeorm/repositories/InstitutionRepository';

container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);

container.registerSingleton<IInstitutionRepository>('InstitutionRepository', InstitutionRepository);