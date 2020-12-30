import { container } from 'tsyringe';

import { IDonatorRepository } from '@modules/Irepository/IDonatorRepository';
import { DonatorRepository } from '@modules/infra/typeorm/repositories/DonatorRepository';

container.registerSingleton<IDonatorRepository>('DonatorRepository', DonatorRepository);