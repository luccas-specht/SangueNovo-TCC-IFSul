import { injectable, inject } from 'tsyringe';

import { MESSAGEINVALID } from '@constants/messageToUser';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { AppError } from '@shared/errors/appError';

import { IDonationRepository } from '../IRepository/IDonatitonRepository';
import { AppDonation } from '../infra/typeorm/entities/AppDonation';
import { AppInstitution } from '@modules/user/institution/infra/typeorm/entities/AppInstitution';

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
    private donationRepository: IDonationRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({
    institution_id,
    day,
    month,
    year,
    status,
  }: IRequest): Promise<AppDonation[]> {
    const institution = await this.institutionRepository.findById(
      institution_id
    );
    if (!institution) throw new AppError(MESSAGEINVALID.institutionNotExists);

    if (
      ![
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ].includes(day)
    )
      throw new AppError(MESSAGEINVALID.invalidDateToListAppointments);

    if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(month))
      throw new AppError(MESSAGEINVALID.invalidDateToListAppointments);

    if (String(year).length !== 4)
      throw new AppError(MESSAGEINVALID.invalidDateToListAppointments);

    const appointments = await this.donationRepository.findAllInDayFromProvider(
      { month, year, day, status }
    );

    console.log('appointments', appointments);

    return appointments.length > 0
      ? this.verifyMatchInstitution(appointments, institution)
      : [];
  }

  private verifyMatchInstitution(
    appointments: AppDonation[],
    institution: AppInstitution
  ): AppDonation[] {
    const institutionMatch: AppDonation[] = [];

    for (let i = 0; i < appointments.length; i++) {
      for (let j = 0; j < institution.campaigns.length; j++) {
        if (appointments[i].campaign.id === institution.campaigns[j].id) {
          institutionMatch.push(appointments[i]);
        }
      }
    }

    return institutionMatch;
  }
}
