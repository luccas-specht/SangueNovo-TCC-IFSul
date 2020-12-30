import { container } from 'tsyringe';

/*providers*/
import { IDonatorRepository } from '@modules/user/donator/iRepository/IDonatorRepository';
import { DonatorRepository } from '@modules/user/donator/infra/typeorm/repositories/DonatorRepository';

import { IInstitutionRepository } from '@modules/user/institution/iRepository/IInstitutionRepository';
import { InstitutionRepository } from '@modules/user/institution/infra/typeorm/repositories/InstitutionRepository';

/*services*/
import { ValidationEmailAlreadyExistsService } from '@modules/user/bothUsers/service/ValidationEmailAlreadyExistsService';
import { ValidationCpfOrCnpjAlreadyExistsService } from '@modules/user/bothUsers/service/ValidationCpfOrCnpjAlreadyExistsService';

container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);

container.registerSingleton<IInstitutionRepository>('InstitutionRepository', InstitutionRepository);

/*sera? TODO: pesquisar outra forma de fazer isso*/
container.registerSingleton<any>('ValidationEmailAlreadyExistsService', ValidationEmailAlreadyExistsService);
container.registerSingleton<any>('ValidationCpfOrCnpjAlreadyExistsService', ValidationCpfOrCnpjAlreadyExistsService);