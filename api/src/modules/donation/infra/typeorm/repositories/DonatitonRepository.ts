import { getRepository, Repository, Raw } from 'typeorm';

import {
  IDonationRepository,
  IFindAllInDayFromProviderDTO,
  IFindAllInMonthFromProviderDTO,
} from '@modules/donation/IRepository/IDonatitonRepository';
import { AppDonation } from '../entities/AppDonation';

export class DonationRepository implements IDonationRepository {
  private ormRepository: Repository<AppDonation>;

  constructor() {
    this.ormRepository = getRepository(AppDonation);
  }

  public async save(campaign: AppDonation): Promise<AppDonation> {
    return await this.ormRepository.save(campaign);
  }

  public async findById(id: string): Promise<AppDonation | undefined> {
    return await this.ormRepository.findOne({
      where: { id: id },
      relations: ['donator', 'campaign'],
    });
  }

  public async findByAppointment(
    appointment: Date,
    status: string
  ): Promise<AppDonation | undefined> {
    return await this.ormRepository.findOne({
      relations: ['donator', 'campaign'],
      where: { appointment_date: appointment, donationStatus: status },
    });
  }

  public async findAllDonationsByDonatitonStatus(
    donationStatus: string
  ): Promise<AppDonation[]> {
    return await this.ormRepository.find({
      where: { donationStatus: donationStatus },
      relations: ['donator', 'campaign'],
    });
  }

  public async findByDonatorId(donatorId: string): Promise<AppDonation[]> {
    return await this.ormRepository.find({
      where: { donator: donatorId },
      relations: ['donator', 'campaign'],
    });
  }
  public async findAllInMonthFromProvider({
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<AppDonation[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        appointment_date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
      relations: ['donator', 'campaign'],
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    year,
    status,
  }: IFindAllInDayFromProviderDTO): Promise<AppDonation[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        appointment_date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        ),
        donationStatus: status,
      },
      relations: ['donator', 'campaign'],
    });

    return appointments;
  }
}
