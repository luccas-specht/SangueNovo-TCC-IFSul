import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IDonatorRepository } from '@modules/user/donator/IRepository/IDonatorRepository';
import { IDonationRepository } from '../IRepository/IDonatitonRepository';
import { DonationStatus } from '../infra/typeorm/entities/EnumDonationStatus';

interface Request {
  donator_id: string;
  donation_id: string;
  donation_status: any;
}

@injectable()
export class UpdateAppointmentStatusService {
  constructor(
    @inject('DonatorRepository')
    private donatorRepository: IDonatorRepository,

    @inject('DonationRepository')
    private donationRepository: IDonationRepository
  ) {}

  public async execute({
    donator_id,
    donation_id,
    donation_status,
  }: Request): Promise<void> {
    const donator = await this.donatorRepository.findById(donator_id);
    if (!donator) throw new AppError(MESSAGEINVALID.donatorNotExists);

    const donation = await this.donationRepository.findById(donation_id);
    if (!donation) throw new AppError(MESSAGEINVALID.appointmentNotExists);

    if (
      ![
        DonationStatus.ACTIVE,
        DonationStatus.FINISHED,
        DonationStatus.REQUESTED,
        DonationStatus.REFUSED,
      ].includes(donation_status)
    )
      throw new AppError(MESSAGEINVALID.invalidDonationStatus);

    if (donation.donationStatus === donation_status)
      throw new AppError(MESSAGEINVALID.statusNotChanged);

    donation.donationStatus = donation_status;
    await this.donationRepository.save(donation);
  }
}
