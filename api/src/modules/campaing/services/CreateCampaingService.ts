import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';

interface Request {
  title: string;
  typeBlood: any;
  dataAvaible: any;
  priority: any;
  idIntitution: string;
  description: string;
  id: string;
}

@injectable()
export class CreateCampaingService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository
  ) {}

  public async execute({
    title,
    typeBlood,
    dataAvaible,
    priority,
    idIntitution,
    description,
    id,
  }: Request): Promise<void> {}
}
