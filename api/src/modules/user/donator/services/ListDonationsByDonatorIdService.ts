import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';

import { IDonatorRepository } from '../IRepository/IDonatorRepository';
import { AppDonation } from '@modules/donation/infra/typeorm/entities/AppDonation';
import { IDonationRepository } from '@modules/donation/IRepository/IDonatitonRepository';
import { DonationStatus } from '@modules/donation/infra/typeorm/entities/EnumDonationStatus';

interface Request {
  id: string;
}

@injectable()
export class ListDonationsByDonatorId {
  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,

    @inject('DonationRepository')
    private donationRepository: IDonationRepository
  ) {}

  public async execute({ id }: Request): Promise<AppDonation[]> {
    const donator = await this.donatorRepository.findById(id);
    if (!donator) throw new AppError(MESSAGEINVALID.userNotExists);

    const donations =
      await this.donationRepository.findByDonatorIdAndDonationStatus(
        donator.id,
        DonationStatus.FINISHED
      );

    return donations;
  }
}
