import { injectable, inject } from 'tsyringe';

import { AppDonation } from '../infra/typeorm/entities/AppDonation';

import { IDonationRepository } from '../IRepository/IDonatitonRepository';

interface IRequest {
  institution_id: string;
  day: number;
  month: number;
  year: number;
  status: string;
}

@injectable()
export class ListProviderAppointmentsService {
  constructor(
    @inject('DonationRepository')
    private donationRepository: IDonationRepository
  ) {}

  public async execute({
    institution_id,
    day,
    month,
    year,
    status,
  }: IRequest): Promise<AppDonation[]> {
    const appointments = await this.donationRepository.findAllInDayFromProvider(
      { day, month, year, status }
    );

    const appointmentsByInstitution = appointments.filter(
      (e) => e.campaign.institution.id === institution_id
    );
    return appointmentsByInstitution;
  }
}
