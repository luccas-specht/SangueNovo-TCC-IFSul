import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/appError';
import { MESSAGEINVALID } from '@constants/messageToUser';
import { IUserRepository } from '@modules/user/bothUsers/IRepository/IUserRepository';
import { ICampaignRepository } from '@modules/campaing/IRepository/ICampaingRepository';
import { AppCampaign } from '../infra/typeorm/entities/AppCampaign';
import { CampaignStatus } from '../infra/typeorm/entities/EnumCampaignStatus';
import { IInstitutionRepository } from '@modules/user/institution/IRepository/IInstitutionRepository';
import { AppInstitution } from '@modules/user/institution/infra/typeorm/entities/AppInstitution';
import { DonationStatus } from '@modules/donation/infra/typeorm/entities/EnumDonationStatus';

interface Request {
  user_id: string;
}

interface Response {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  currentGoal: string;
  availableDate: Date;
  bloodType: string;
  priority: string;
  creatorUserId: string;
  institution: {
    id: string;
    razao_social: string;
    address: {
      latitude: number;
      longitude: number;
    };
  };
}

@injectable()
export class ListCampaignsByUserIdService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,

    @inject('InstitutionRepository')
    private institutionRepository: IInstitutionRepository
  ) {}

  public async execute({ user_id }: Request): Promise<Response[]> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError(MESSAGEINVALID.userNotExists);

    const institution = await this.institutionRepository.findByIdUser(user.id);

    const campaigns = await this.campaignRepository.ListAllCampaigns(
      CampaignStatus.ACTIVE
    );

    return campaigns.length > 0
      ? this.filterByUserId(campaigns, user_id, institution)
      : [];
  }

  private filterByUserId(
    list: AppCampaign[],
    user_id: string,
    institution?: AppInstitution
  ): Response[] {
    const filteredList = list.filter((campaign) =>
      !!institution
        ? campaign.user.id === user_id ||
          campaign.institution.id === institution.id
        : campaign.user.id === user_id
    );
    return this.mapperCampaigns(filteredList);
  }

  private mapperCampaigns(list: AppCampaign[]): Response[] {
    return list.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      avatar: campaign.avatar,
      currentGoal: this.calculatePercentage(campaign.goal, campaign.donations),
      availableDate: campaign.availableDate,
      bloodType: campaign.typeBlood,
      priority: campaign.priority,
      creatorUserId: campaign.user.id,
      institution: {
        id: campaign.institution.id,
        razao_social: campaign.institution.razao_social,
        address: {
          latitude: campaign.institution.latitude,
          longitude: campaign.institution.longitude,
        },
      },
    }));
  }

  private calculatePercentage(inicialGoal: number, actualDonations: any[]) {
    const currentDonationsFinished = actualDonations.filter(
      (donations) => donations?.donationStatus === DonationStatus.FINISHED
    );
    let totalDonations = currentDonationsFinished.length;
    if (totalDonations) {
      totalDonations = totalDonations * 50;
      const result = totalDonations / inicialGoal;
      return result.toPrecision(2);
    } else {
      return '0';
    }
  }
}
