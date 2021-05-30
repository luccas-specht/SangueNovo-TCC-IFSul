import { AppDonation } from '../infra/typeorm/entities/AppDonation';

export interface IFindAllInMonthFromProviderDTO {
  month: number;
  year: number;
}

export interface IFindAllInDayFromProviderDTO
  extends IFindAllInMonthFromProviderDTO {
  day: number;
  status: string;
}

export interface IDonationRepository {
  save(donation: AppDonation): Promise<AppDonation>;
  findById(id: string): Promise<AppDonation | undefined>;
  findByAppointment(
    appointment: Date,
    status: string
  ): Promise<AppDonation | undefined>;

  findAllDonationsByDonatitonStatus(
    donationStatus: string
  ): Promise<AppDonation[]>;

  findByDonatorIdAndDonationStatus(
    donatorId: string,
    status: string
  ): Promise<AppDonation[]>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO
  ): Promise<AppDonation[]>;

  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO
  ): Promise<AppDonation[]>;

  // updateDonatiton(donation: AppDonation): Promise<AppDonation>;
  // updateAppointment(donation: AppDonation): Promise<AppDonation>;
}
