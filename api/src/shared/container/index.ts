import { container } from 'tsyringe';

import { IUserRepository } from '@modules/Irepository/IUsersRepository';
import { UserRepository } from '@modules/infra/typeorm/repositories/UserRepository';

import { IDonatorRepository } from '@modules/Irepository/IDonatorRepository';
import { DonatorRepository } from '@modules/infra/typeorm/repositories/DonatorRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);